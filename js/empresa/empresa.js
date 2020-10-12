import api from '../api.js';
import router from '../routes.js'

var Empresa = {
    data: function(){
        return {
            empresas: [],
            empresa: {},
            urgencia: false,
            getsplit: true,
            pedido: ""
        };
    },
    methods: {
        solicitar(){
            api.solicitar_insumos( this.empresa_id, this.empresa,  this.pedido, this.getsplit, this.urgencia );

            $("#modal_msg_sucesso").modal("show");

            $("#modal_msg_sucesso").on('hidden.bs.modal', function (e) {
                router.push('vizinhanca')
            });
        }
    },
    beforeMount(){
        if( !this.$route.params.empresa || !this.$route.params.empresa )
            router.push('vizinhanca')

        this.empresa = this.$route.params.empresa;
        this.empresa_id = this.$route.params.empresa_id;
    },
    mounted() {
        
    },
    template: `<div class="col-12 col-md-6 offset-md-3">
        

        <div class="row">
            <div class="col-12 text-center gt-bg-gradient">
                <h5> 
                    {{empresa.razao_social}} </h5>
                    <p>{{empresa.cnpj}}
                    <br>
                    {{empresa.cnae}}
                    <br>
                    {{empresa.municipio}} - {{empresa.uf}}
                </p>
            </div>

            <div class="col-12" style="margin: 15px 0px;">
                <div class="gt-empresa-card">
                    Forneça os dados do pedido:
                    <textarea v-model="pedido" class="form-control"></textarea>
                </div>
                <div class="gt-empresa-card">
                    <p>Deseja fazer o pagamento através do GetSplit?</p>
                    
                    <label>
                        <input type="radio" v-model="getsplit" value="true" /> Sim
                    </label>
                    <label>
                        <input type="radio" v-model="getsplit" value="false" /> Não
                    </label>
                </div>
                <div class="gt-empresa-card">
                    <label>
                        <input type="checkbox" v-model="urgencia" />
                        Tenho urgência no recebimento deste produto
                    </label>
                </div>
            </div>

            <div class="col-12" style="margin: 15px 0px;">
                <button type="button" class="btn btn-block btn-danger gt-btn-danger" @click="solicitar()">Solicitar</button>
            </div>
        </div>
                    

        <div class="modal" id="modal_msg_sucesso" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header" style="padding: 5px;">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" style="padding: 0px 15px;">
                        <p style="color:green"> <i class="fa fa-check-circle"></i> Sua solicitação foi enviada com sucesso!</p>

                        <p>Entre em contato com o estabelecimento para negociar a proposta.</p>

                        Telefone: {{empresa.telefone}}

                        <br><br>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-block btn-danger gt-btn-danger" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`
};

export default Empresa;