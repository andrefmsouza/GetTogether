import api from '../api.js';
import router from '../routes.js'

const SimularPagamentos = { 
    data: function(){
      return {
        empresas: [],
        empresa: {},
        valor: 0
      }
    },
    methods: {
        abrir_modal(e, i){
          this.empresa = {id: i, ...e};
          this.valor = 0;

          $("#modal_pagamento").modal("show")
        },
        receber_pagamento(){
          if( this.valor <= 0){
            alert("Informe o valor recebido!");
            return;
          }

          api.receber_valor(this.empresa, parseFloat(this.valor));

          $("#modal_pagamento").modal("hide");
        }
    },
    beforeMount(){
      api.get_empresas().then( data => this.empresas = data );  
    },
    template: `<div class="col-12">
      <div class="row">
        <div class="col-12 gt-card" v-for="(e, i) in empresas" @click="abrir_modal(e, i)">
          {{e.razao_social}}
        </div>
      </div>


      <div class="modal" id="modal_pagamento" tabindex="-1" role="dialog" >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header" style="padding: 5px;">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" style="padding: 0px 15px;">
                        Informe o valor recebido:

                        <input type="number" class="form-control" v-model="valor" />

                        <br><br>
                    </div>
                    <div class="modal-footer">
                        
                        <button class="col-12 btn btn-success" @click="receber_pagamento()"> Receber pagamento </button>
                    </div>
                </div>
            </div>
        </div>

    </div>`
};

export default SimularPagamentos;