import api from '../api.js';
import router from '../routes.js'

var Vizinhanca = {
    data: function(){
        return {
            empresas: []
        };
    },
    methods: {
        solicitar_produto(empresa, empresa_id){
            router.push({ name: 'empresa', params: { empresa, empresa_id } })
        },
    },
    beforeMount(){
        api.get_empresas().then( data => this.empresas = data );
    },
    mounted() {
    },
    template: `<div class="col-12 col-md-6 offset-md-3">
        <div v-for="(empresa, id) in empresas">
            <div class="gt-empresa-card">
                
                <h5>{{empresa.razao_social}}</h5>
                <small class="gt-txt-rounded">{{empresa.cnae}}</small>

                <br><br>

                <button class="btn btn-xs btn-danger gt-btn-danger float-right" @click="solicitar_produto(empresa, id)">Solicitar Produto</button>
                <br>
                
            </div>
        </div>
    </div>`
};

export default Vizinhanca;