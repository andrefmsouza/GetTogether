import api from '../api.js';

var AcompanharSolicitacoes = {
    data: function(){
        return {
            solicitacoes: [],
            em_andamento: [],
            aguardando_resposta: [],
            recebidas: [],
            proposta: null,
            valor: 0
        };
    },
    methods: {
        atualizar_tela(){
            api.get_solicitacoes().then( data => {
                this.solicitacoes = data;

                let solicitacoes_enviadas = data.solicitacoes_enviadas;
                this.em_andamento = solicitacoes_enviadas.filter( d => d.status === "em andamento" );
                this.aguardando_resposta = solicitacoes_enviadas.filter( d => d.status === "aguardando empresa solicitada" );

                let solicitacoes_recebidas = data.solicitacoes_recebidas;
                this.recebidas = solicitacoes_recebidas.filter( d => d.status === "aguardando empresa solicitada" );
            });
        },
        ver_proposta(solicitacao){
            this.proposta = solicitacao;

            $("#modal_proposta").modal("show");
        },
        recusar_proposta(){
            if(confirm("Tem certeza que deseja recusar essa proposta?")){
                api.recusar_proposta( this.proposta.id )

                $("#modal_proposta").modal("hide");

                this.atualizar_tela();
            }
        },
        aceitar_proposta(){
            if( this.valor <= 0){
                alert("Informe o valor que será cobrado do estabelecimento");
                return;
            }

            api.aceitar_proposta( this.proposta.id, this.valor )

            $("#modal_proposta").modal("hide");

            this.atualizar_tela();
        }
    },
    beforeMount(){
        this.atualizar_tela();
    },
    mounted() {
        
    },
    template: `<div class="col-12 col-md-6 offset-md-3">
        <div class="gt-card">
            Em andamento
            <div class="gt-solicitacao" v-for="solicitacao in em_andamento" >
                <h5>{{solicitacao.empresa.razao_social}}</h5>

                <small><p>{{solicitacao.pedido}}</p></small>

                <b>Valor total do pedido: </b> R$ {{solicitacao.valor}} <br>
                <b>Valor pago: </b> R$ {{solicitacao.total_pago}} <br>
                <b>Valor devido: </b> R$ {{solicitacao.valor - solicitacao.total_pago}} <br>

                <br>
                
                <p>Telefone: {{solicitacao.empresa.telefone}}</p>
            </div>
        </div>
        <div class="gt-card">
            Aguardando resposta
            <hr>
            <div class="gt-solicitacao" v-for="solicitacao in aguardando_resposta" >
                <h5>{{solicitacao.empresa.razao_social}}</h5>

                <small><p>{{solicitacao.pedido}}</p></small>

                <p><b>Telefone:</b> {{solicitacao.empresa.telefone}}</p>
            </div>
        </div>
        <div class="gt-card">
            Recebidas
            <div class="gt-solicitacao" v-for="solicitacao in recebidas" >
                <h5>{{solicitacao.empresa.razao_social}}</h5>

                <small><p>{{solicitacao.pedido}}</p></small>

                <button class="btn btn-block btn-danger gt-btn-danger" @click="ver_proposta(solicitacao)">Ver proposta</button>
            </div>
        </div>

        <div class="modal" id="modal_proposta" tabindex="-1" role="dialog" >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header" style="padding: 5px;">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" style="padding: 0px 15px;" v-if="proposta">
                        <h5>{{proposta.empresa.razao_social}}</h5>
                        <hr>

                        <b>Solicitacao:</b>
                        <textarea disabled class="form-control">{{proposta.pedido}}</textarea>

                        <b>Pagamento através do GetSplit?</b> {{proposta.getsplit == true ? 'Sim' : 'Não' }}
                        <br>
                        <b>Urgência no recebimento deste produto?</b> {{proposta.urgencia == true ? 'Sim' : 'Não' }}

                        <br><br>

                        Informe o valor que será cobrado do estabelecimento:
                        <input type="number" class="form-control" v-model="valor" />

                        <br>
                    </div>
                    <div class="modal-footer">
                        <button class="col-6 btn btn-danger" @click="recusar_proposta()" > Recusar </button>
                        <button class="col-6 btn btn-success" @click="aceitar_proposta()"> Aceitar </button>
                    </div>
                </div>
            </div>
        </div>


    </div>`
};

export default AcompanharSolicitacoes;