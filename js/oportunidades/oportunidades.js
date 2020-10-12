import api from '../api.js';

var Oportunidades = {
    data: function(){
        return {
            recomendacoes: {},
            rede_social: "twitter",
            localizacao: ""
        };
    },
    methods: {
        
    },
    beforeMount(){
        api.get_meu_estabelecimento().then( data => {
            this.localizacao = data.municipio 
        
            api.buscar_recomendacoes().then( data => this.recomendacoes = data );
        })
    },
    template: `<div class="col-12">
        <p class="text-danget">
            Interaja com o seu público nas redes sociais
        </p>  
        <div class="row">
            <div class="col-6">
                <select class="form-control gt-input" v-model="rede_social">
                    <option value="todas">Todas as redes sociais</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="twitter">Twitter</option>
                </select>
            </div>
            <div class="col-6">
                <input type="text" class="form-control gt-input" v-model="localizacao"/>
            </div>
        </div>

        <br><br>

        <div class="gt-card" v-for="(recomendacao, i) in recomendacoes.Twitter" >
            <h4>
                <a v-bind:href=" 'https://www.twitter.com/'+ recomendacoes.User[i]" target="blank">
                <i class="fab fa-twitter-square"></i>
                    {{recomendacoes.User[i]}}
                </a>
            </h4>    
            {{recomendacao}}
        </div>
        
      </div>
    </div>`
};

export default Oportunidades;