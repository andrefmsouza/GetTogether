import api from '../api.js';
import router from '../routes.js';

const CompletarCadastro = { 
    methods: {
      salvar(){
        if(
          this.cnpj == '' ||
          this.razao_social == '' ||
          this.nome_fantasia == '' ||
          this.cnae == '' ||
          this.telefone == '' ||
          this.cep == '' ||
          this.municipio == '' ||
          this.uf == ''
        ){
            alert("Preencha todos os campos!");
            return;
        } 
        
        if( api.salva_dados_empresa({
          cnpj: this.cnpj,
          razao_social: this.razao_social,
          nome_fantasia: this.nome_fantasia,
          cnae: this.cnae,
          telefone: this.telefone,
          cep: this.cep,
          municipio: this.municipio,
          uf: this.uf
        }) ){
          router.push("/vizinhanca");
        }else{
          alert("Erro ao salvar os dados da empresa! Tente novamente");
        }
        
      }
    },
    data: function(){
      return {
        cnpj: '',
        razao_social: '',
        nome_fantasia: '',
        cnae: '',
        telefone: '',
        cep: '',
        municipio: '',
        uf: '',
      }
    },
    beforeMount(){

      $("body").addClass("gray-bg");
    },
    template: `<div class="middle-box text-center loginscreen animated fadeInDown">
        <div>
          <div>
            <img src="img/logo.jpeg" class="img-fluid" alt="Logo" />
            
          </div>
          <br>
          
            <div class="form-group text-left">
              <input type="text" class="form-control" placeholder="CNPJ" v-model="cnpj" required="">
            </div>
            <div class="form-group text-left">
              <input type="text" class="form-control" placeholder="Nome do estabelecimento" v-model="razao_social" required="">
            </div>
            <div class="form-group text-left">
              <input type="text" class="form-control" placeholder="Nome fantasia" v-model="nome_fantasia" required="">
            </div>
            <div class="form-group text-left">
              <input type="text" class="form-control" placeholder="CNAE (Ramo de atividade)" v-model="cnae" required="">
            </div>
            <div class="form-group text-left">
              <input type="text" class="form-control" placeholder="Telefone" v-model="telefone" required="">
            </div>

            <hr>

            <div class="form-group text-left">
              <input type="text" class="form-control" placeholder="CEP" v-model="cep" required="">
            </div>
            <div class="form-group text-left">
              <input type="text" class="form-control" placeholder="Município" v-model="municipio" required="">
            </div>
            <div class="form-group text-left">
              <input type="text" class="form-control" placeholder="Estado" v-model="uf" required="">
            </div>
            <button class="btn btn-danger gt-btn-danger block full-width m-b" @click="salvar()">Salvar</button>
        
        </div>
        <hr>
    </div>`
};

export default CompletarCadastro;