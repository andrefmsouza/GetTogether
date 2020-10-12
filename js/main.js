import router from './routes.js';
import api from "./api.js"

var app = new Vue({
    router,
    data: {
        usuario: {}
    },
    methods: {
        verifica_sessao: function(path){
            const user = api.sessao()
            if( !user && ( path != "/login" && path != "/cadastro" && path != "/completar_cadastro" ) ){
                router.push("/login");
                return;
            }

            if( user && path != "/completar_cadastro" ){
                let uid = user.uid;
                api.verifica_dados_usuario(uid).then( (data) => {
                    if( !data )
                        router.push("/completar_cadastro");
                } );
            }
        }
    },
    watch: {
        '$route': function (to, from) {
            api.currentPath = from.path;
            this.verifica_sessao( to.path );
        }   
    },
    beforeMount(){
        this.verifica_sessao(this.$route.path);
    }
}).$mount('#app');