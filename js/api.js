import router from './routes.js';

const api = {
    authListener: null,
    URL_RECOMENDACOES: "https://recomend.herokuapp.com",
    currentPath: "/vizinhanca",
    sessao: function(){
        return firebase.auth().currentUser;
    },
    onAuthStateChanged: function( ){
        this.authListener = firebase.auth().onAuthStateChanged(function(usuario){
            if(usuario){
                if(api.currentPath == "/")
                    api.currentPath = "/vizinhanca";
                router.push(api.currentPath);
            }
        });
    },
    login: function(email, senha){
        if( this.authListener )
            this.authListener();

        return firebase.auth().signInWithEmailAndPassword(email, senha);
    },
    signOut: function(){
        return firebase.auth().signOut();
    },

    createUserWithEmailAndPassword(email, senha){
        return firebase.auth().createUserWithEmailAndPassword(email, senha);
    },

    verifica_dados_usuario(uid){
        return new Promise( (resolve, reject) => {
            firebase.database().ref("usuarios/" + uid ).once("value", (snapshot) => {
                const data = snapshot.val();

                resolve(data);
            });
        });
    },

    get_empresas(){
        return new Promise( (resolve, reject) => {
            firebase.database().ref("usuarios" ).once("value", (snapshot) => {
                const data = snapshot.val();

                resolve(data);
            });
        });
    },

    get_meu_estabelecimento(){
        return new Promise( (resolve, reject) => {
            let user = firebase.auth().currentUser;

            firebase.database().ref("usuarios/" + user.uid ).once("value", (snapshot) => {
                const data = snapshot.val();

                resolve(data);
            });
        });
    },

    buscar_recomendacoes( cidade = "São Paulo", key_words = "pizza" ){
        return new Promise( (resolve, reject) => {
            jQuery.support.cors = true;
            $.get(`${this.URL_RECOMENDACOES}/${cidade}/${key_words}`).done( data => {
                resolve(data);
            } ).fail( err => reject(err) )
        });
    },

    salva_dados_empresa( data ){
        let user = firebase.auth().currentUser;

        return firebase.database().ref("usuarios/" + user.uid ).set(data);
    },

    solicitar_insumos(empresa_id, empresa, pedido, getsplit, urgencia){
        let user = firebase.auth().currentUser;

        return firebase.database().ref("solicitacoes" ).push({
            empresa_solicitante: user.uid,
            empresa_solicitada: empresa_id,
            empresa,
            pedido,
            getsplit,
            urgencia,
            valor: 0,
            total_pago: 0,
            status: "aguardando empresa solicitada",
            hora_solicitacao: {'.sv': 'timestamp'}
        });
    },

    get_solicitacoes(){
        return new Promise( (resolve, reject) => {
            let user = firebase.auth().currentUser;

            let ref = firebase.database().ref("solicitacoes" );

            ref
                .orderByChild("empresa_solicitante").equalTo(user.uid).once("value", function(snapshot) {
                
                    let solicitacoes_enviadas = [];
                    snapshot.forEach( s => {
                        let v = s.val();

                        if(v.status == "aguardando empresa solicitada" || v.status == "em andamento"){
                            solicitacoes_enviadas.push({
                                id: s.key,
                                ...v
                            })
                        }
                    } );

                ref.orderByChild("empresa_solicitada").equalTo(user.uid).once("value", function(snapshot) {
                
                    let solicitacoes_recebidas = [];
                    snapshot.forEach( s => {
                        let v = s.val();

                        if(v.status == "aguardando empresa solicitada"){
                            solicitacoes_recebidas.push({
                                id: s.key,
                                ...v
                            })
                        }
                    } );

                    resolve( { solicitacoes_enviadas, solicitacoes_recebidas } )
                });
            });
        });
    },

    recusar_proposta(id){
        firebase.database().ref(`solicitacoes/${id}/status`  ).set('recusada pela empresa solicitada');
    },

    aceitar_proposta(id, valor){
        firebase.database().ref(`solicitacoes/${id}/valor` ).set(valor);
        firebase.database().ref(`solicitacoes/${id}/status` ).set('em andamento');
    },

    get_pendencias(){
        return new Promise( (resolve, reject) => {
            let user = firebase.auth().currentUser;

            let ref = firebase.database().ref("solicitacoes" );

            ref.orderByChild("empresa_solicitante").equalTo(user.uid).once("value", function(snapshot) {
                let solicitacoes_enviadas = [];
                snapshot.forEach( s => {
                    let v = s.val();

                    if( v.status == "em andamento"){
                        solicitacoes_enviadas.push({
                            id: s.key,
                            ...v
                        })
                    }
                } );

                resolve(solicitacoes_enviadas);
            });
        });
    },

    receber_valor(empresa, valor){
        
        firebase.database().ref("recebimentos" ).push({
            empresa: empresa.id,
            valor,
            hora_recebimento: {'.sv': 'timestamp'}
        });
        

        //Calcula o valor do rateio
        let valor_rateio = parseFloat(valor) * 0.3;

        //Verifica se o estabelecimento possui getslit pendente
        let user = firebase.auth().currentUser;

        firebase.database().ref("solicitacoes" ).orderByChild("empresa_solicitante").equalTo(user.uid).once("value", function(snapshot) {
            
            let getsplit = {};
            let total_devido = 0;
            
            snapshot.forEach( s => {
                let v = s.val();

                if( v.status == "em andamento" && v.getsplit == true){
                    if( !getsplit[v.empresa_solicitada] ){
                        getsplit[v.empresa_solicitada] = {
                            valor_devido: 0,
                            solicitacoes: []
                        };
                    }

                    getsplit[v.empresa_solicitada].valor_devido += parseFloat(v.valor) - parseFloat(v.total_pago);
                    getsplit[v.empresa_solicitada].solicitacoes.push( {
                        id: s.key,
                        valor: parseFloat(v.valor),
                        valor_pago: parseFloat(v.total_pago)
                    } );

                    total_devido += parseFloat(v.valor) - parseFloat(v.total_pago);
                }
            } );

            console.log(total_devido, valor_rateio, getsplit);

            for( let g in getsplit ){
                //Calcula o percentual devido para cada estabelecimento
                let percentual = getsplit[g].valor_devido / total_devido;
                percentual = percentual.toFixed(3);

                let total_a_pagar = valor_rateio * percentual;
                total_a_pagar = total_a_pagar.toFixed(2);

                let total_restante = total_a_pagar;

                //Paga os fornecedores
                for( let s in getsplit[g].solicitacoes ){
                    //valor em aberto
                    let valor_em_aberto = getsplit[g].solicitacoes[s].valor - getsplit[g].solicitacoes[s].valor_pago;

                    //verifica se o valor restante a pagar para o estabelecimento é menor que o valor em aberto
                    if( total_restante <  valor_em_aberto ){
                        firebase.database().ref("pagamentos" ).push({
                            empresa_solicitante: user.uid,
                            empresa_solicitada: g,
                            valor: total_restante,
                            hora_pagamento: {'.sv': 'timestamp'}
                        });

                        getsplit[g].solicitacoes[s].valor_pago += parseFloat(total_restante);
                        getsplit[g].solicitacoes[s].valor_pago.toFixed(2);

                        firebase.database().ref(`solicitacoes/${getsplit[g].solicitacoes[s].id}/total_pago` ).set( getsplit[g].solicitacoes[s].valor_pago );
                        break;
                    }
                    
                    //verifica se o valor restante a pagar para o estabelecimento é maior ou igual que o valor em aberto
                    if( total_restante >=  valor_em_aberto ){
                        firebase.database().ref("pagamentos" ).push({
                            empresa_solicitante: user.uid,
                            empresa_solicitada: g,
                            valor: valor_em_aberto,
                            hora_pagamento: {'.sv': 'timestamp'}
                        });

                        total_restante -= valor_em_aberto;
                        total_restante = total_restante.toFixed(2);

                        getsplit[g].solicitacoes[s].valor_pago += parseFloat(valor_em_aberto);
                        getsplit[g].solicitacoes[s].valor_pago.toFixed(2);

                        firebase.database().ref(`solicitacoes/${getsplit[g].solicitacoes[s].id}/total_pago` ).set( getsplit[g].solicitacoes[s].valor_pago );
                        firebase.database().ref(`solicitacoes/${getsplit[g].solicitacoes[s].id}/status` ).set( "pago" );
                    }
                }
            }
        });
    },

    get_extrato(){
        return new Promise( (resolve, reject) => {
            let user = firebase.auth().currentUser;

            let extrato = [];
            firebase.database().ref("pagamentos" ).orderByChild("empresa_solicitante").equalTo(user.uid).once("value", function(snapshot) {
                
                snapshot.forEach( s => {
                    let v = s.val();

                    extrato.push({
                        hora: v.hora_pagamento,
                        valor: v.valor,
                        tipo: 'saída',
                        destino: v.empresa_solicitada
                    });
                } );

                firebase.database().ref("recebimentos" ).orderByChild("empresa").equalTo(user.uid).once("value", function(snapshot) {
                    
                    snapshot.forEach( s => {
                        let v = s.val();
    
                        extrato.push({
                            hora: v.hora_pagamento,
                            valor: v.valor,
                            tipo: 'entrada',
                            destino: ''
                        });
                    } );

                    extrato.sort( (a, b) => {
                        if( a.hora < b.hora ) return 1;
                        if( b.hora < a.hora ) return -1;
                        
                        return 0;
                    } )
    
                    resolve(extrato);
                });
            });
        });
    }

};

export default api