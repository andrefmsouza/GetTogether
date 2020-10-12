import api from '../api.js';
import router from '../routes.js';

const Cadastro = { 
    methods: {
        cadastrar_com_email(){
          if(this.senha != this.senha_confirm){
            alert("A senha digitada não é a mesma da confirmação!\nPor favor, verifique sua senha e tente novamente.");
            return;
          }
          api.createUserWithEmailAndPassword(this.email, this.senha)
          .then( (data) => {
            $("body").removeClass("gray-bg");
            router.push("/completar_cadastro");
          } )
          .catch(function(error) {
            alert("Ocorreu um erro ao cadastrar o usuário!\nErro: " + error.message);
          });
        }
    },
    data: function(){
      return {
        email: '',
        senha: '',
        senha_confirm: ''
      }
    },
    beforeMount(){

      var usuario = api.sessao();
      if( usuario ){ 
        router.push("/"); 
        return; 
      }

      $("body").addClass("gray-bg");
    },
    template: `<div class="middle-box text-center loginscreen animated fadeInDown">
        <div>
          <div>
            <img src="img/logo.png" class="img-fluid" alt="Logo" />
            
          </div>
          <br>
          <form class="m-t" role="form" v-on:submit.prevent="cadastrar_com_email">
              <div class="form-group text-left">
                <h4>E-mail:</h4>
                <input type="email" class="form-control" placeholder="" v-model="email" required="">
              </div>
              <div class="form-group text-left">
                <h4>Senha:</h4>
                <input type="password" class="form-control" placeholder="" v-model="senha" required="">
              </div>
              <div class="form-group text-left">
                <h4>Confirmação de senha:</h4>
                <input type="password" class="form-control" placeholder="" v-model="senha_confirm" required="">
              </div>
              <button type="submit" class="btn btn-danger gt-btn-danger block full-width m-b">Cadastrar</button>
          </form>
        </div>
        <hr>
        <button class="btn btn-danger gt-btn-danger btn-block" @click="$router.push('/login');">
          Login
        </button>
    </div>`
};

export default Cadastro;