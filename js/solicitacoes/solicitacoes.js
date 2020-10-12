import api from '../api.js';

var Solicitacoes = {
    data: function(){
        return {
            meu_estabelecimento: null,
            empresas: []
        };
    },
    methods: {
        
    },
    beforeMount(){
        api.get_meu_estabelecimento().then( data => this.meu_estabelecimento = data );

        api.get_empresas().then( data => this.empresas = data );
    },
    template: `<div class="col-12 col-md-6 offset-md-3">
        <router-link :to="{ name: 'vizinhanca'}">
            <img class="btn-solicitacao" src="/img/nova_solicitacao.png" alt="nova_solicitacao" />
        </router-link> 
           
        <br><br>

        <router-link :to="{ name: 'acompanhar-solicitacoes'}">
            <img class="btn-solicitacao" src="/img/acompanhar_solicitacoes.png" alt="acompanhar_solicitacoes" />
        </router-link> 
        
      </div>
    </div>`
};

export default Solicitacoes;