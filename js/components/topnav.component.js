import api from '../api.js';
import router from '../routes.js'

Vue.component('topnav', {
    methods: {
      logout: function(){
        api.signOut().then(function() {
          // Sign-out successful.
          router.push("/login");
        }).catch(function(error) {
          // An error happened.
          alert("Ocorreu um erro ao fazer o logout.");
        });
      }
    },
    template: `<div class="row border-bottom white-bg">
      <nav class="navbar navbar-fixed-top" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header text-center">
            <a href="#"> <img src="/img/logo.png" height="50px" alt="logo"/> </a>
        </div>
        <ul class="nav navbar-top-links navbar-right">
            <li>
                <a @click="logout()">
                    <i class="fa fa-sign-out-alt"></i>Sair
                </a>
            </li>
        </ul>
      </nav>
    </div>`
});