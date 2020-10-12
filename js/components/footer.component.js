Vue.component('footer-component', {
    template: `<footer class="footer" style="position:fixed;">
      <div class="text-center">
        <router-link class="gt-menu-item" :to="{ name: 'vizinhanca'}">
          <i class="fa fa-map-marker-alt" ></i>
          <p>Vizinhança</p>
        </router-link>    
        <router-link class="gt-menu-item" :to="{ name: 'meu-estabelecimento'}">
          <i class="fa fa-warehouse" ></i>
          <p>Meu Estabelecimento</p>
        </router-link>    
        <router-link class="gt-menu-item" :to="{ name: 'solicitacoes'}">
          <i class="fa fa-cart-plus" ></i></i>
          <p>Solicitações</p>
        </router-link>    
        <router-link class="gt-menu-item" :to="{ name: 'oportunidades'}">
        <i class="fa fa-comments"></i></i>
          <p>Oportunidades</p>
        </router-link>    
      </div>
    </footer>`
});