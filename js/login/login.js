import api from '../api.js';
import router from '../routes.js'

const Login = { 
    methods: {
        login: function(){        

          api.login(this.email, this.senha)
          .then(function(data){
            $("body").removeClass("gray-bg");
            router.push("/vizinhanca");
          }).catch(function(error) {
            console.log(error)
            alert("Usuário ou senha inválidos");
          });
        }
    },
    data: function(){
      return {
        email: '',
        senha: ''
      }
    },
    beforeMount(){
      api.onAuthStateChanged();
      
      $("body").addClass("gray-bg");
    },
    template: `<div class="middle-box text-center loginscreen animated fadeInDown">
        <div>
            <div>
              <img src="img/logo.png" class="img-fluid" alt="Logo" />
              
            </div>
            <br>
            <form class="m-t" role="form" v-on:submit.prevent="login">
                <div class="form-group text-left">
                  <h4>E-mail:</h4>
                  <input type="email" class="form-control" placeholder="E-mail" v-model="email" required="">
                </div>
                <div class="form-group text-left">
                  <h4>Senha:</h4>
                  <input type="password" class="form-control" placeholder="Senha" v-model="senha" required="">
                </div>
                <button type="submit" class="btn btn-danger gt-btn-danger block full-width m-b">Login</button>
            </form>
        </div>
        <hr>
        <button class="btn btn-danger gt-btn-danger btn-block" @click="$router.push('/cadastro');">
          Cadastrar
        </button>
    </div>`
};

export default Login;