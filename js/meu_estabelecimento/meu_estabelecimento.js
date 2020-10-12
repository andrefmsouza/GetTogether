import api from '../api.js';
import router from '../routes.js'

var MeuEstabelecimento = {
    data: function(){
        return {
            meu_estabelecimento: null,
            empresas: [],
            pendencias: [],
            extrato: []
        };
    },
    methods: {
        solicitar_produto(empresa, empresa_id){
            router.push({ name: 'empresa', params: { empresa, empresa_id } })
        },
    },
    beforeMount(){
        api.get_meu_estabelecimento().then( data => this.meu_estabelecimento = data );

        api.get_empresas().then( data => this.empresas = data );

        api.get_pendencias().then( data => this.pendencias = data );

        api.get_extrato().then( data => this.extrato = data );
    },
    template: `<div class="col-12 col-md-6 offset-md-3">
        <div class="text-center gt-bg-gradient" style="margin: -24px -15px 0 -15px; padding: 50px;"  v-if="meu_estabelecimento != null">
            <h5>{{meu_estabelecimento.razao_social}}</h5>
            {{meu_estabelecimento.cnpj}} <br />
            {{meu_estabelecimento.cnae}} <br />
            {{meu_estabelecimento.municipio}} / {{meu_estabelecimento.uf}}
        </div>

        <ul class="nav" id="meusDados" role="tablist">
            <li class="nav-item" role="presentation">
                <a class="nav-link active" id="financeiro-tab" data-toggle="tab" href="#financeiro" role="tab" aria-controls="financeiro" aria-selected="true">
                    <i class="fas fa-dollar-sign"></i>
                    Financeiro
                </a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link" id="minha-rede-tab" data-toggle="tab" href="#minha-rede" role="tab" aria-controls="minha-rede" aria-selected="false">
                    <i class="fas fa-users"></i>
                    Minha Rede
                </a>
            </li>   
        </ul>
      <div class="tab-content" id="meusDadosContent">
        <div class="tab-pane fade show active" id="financeiro" role="tabpanel" aria-labelledby="financeiro-tab">
            <div class="gt-card">
                Extrato
                <hr>
                <div class="gt-solicitacao" v-for="e in extrato" >
                    <div v-if="e.tipo == 'saída' " class="text-danger">
                        {{empresas[e.destino].razao_social}} 
                        <br>
                        R$ {{e.valor}}
                    </div>

                    <div v-if="e.tipo == 'entrada' " class="text-success">
                        R$ {{e.valor}}
                    </div>
                </div>
            </div>

            <div class="gt-card">
                Pendências
                <hr>
                <div class="gt-solicitacao" v-for="p in pendencias" >
                    <h5>{{p.empresa.razao_social}}</h5>

                    <small>{{p.pedido}}</small>

                    <b>R$ {{p.valor - p.total_pago}}</b>

                    <br>

                    <p><b>Telefone:</b> {{p.empresa.telefone}}</p>

                    <button class="btn btn-block btn-xs btn-danger gt-btn-danger">Quitar dívida</button>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="minha-rede" role="tabpanel" aria-labelledby="minha-rede-tab">
            <div v-for="(empresa, id) in empresas" >
                <div class="gt-empresa-card">
                    <div class="row no-gutters">
                        <div class="col-4">
                            <img src="/img/logo.jpeg" class="card-img" alt="empresa">
                        </div>
                        <div class="col-8">
                            <div class="card-body" style="padding: 5px;">
                                <h5>{{empresa.razao_social}}</h5>
                                
                                <button class="btn btn-xs btn-danger gt-btn-danger float-right" @click="solicitar_produto(empresa, id)">Solicitar Produto</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
      </div>
    </div>`
};

export default MeuEstabelecimento;