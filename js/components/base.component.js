
import router from "../routes.js"
import api from "../api.js"

const Base = { 
    data: function(){
      return {
      };
    },
    methods: {
    },
    beforeMount(){
      var usuario = api.sessao();

      if( !usuario ){ router.push("/login"); return; }

      this.$root.$data.usuario = usuario;
    },
    mounted(){
      inspinia();
    },
    template: `<div id="wrapper">  
      <div id="page-wrapper">

          <topnav></topnav>

          <div class="row dashboard-header" style="padding: 70px 0px 80px 0px;">
            <router-view></router-view>
          </div>
  
        <footer-component></footer-component>

      </div>
  

    </div>`
};

export default Base;