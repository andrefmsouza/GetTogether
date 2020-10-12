import Base from './components/base.component.js'

import Login from './login/login.js'
import Cadastro from './cadastro/cadastro.js'
import CompletarCadastro from './cadastro/completar_cadastro.js'
import Vizinhanca from './vizinhanca/vizinhanca.js';
import MeuEstabelecimento from './meu_estabelecimento/meu_estabelecimento.js';
import Solicitacoes from './solicitacoes/solicitacoes.js';
import AcompanharSolicitacoes from './solicitacoes/acompanhar_solicitacao.js';
import Oportunidades from './oportunidades/oportunidades.js';
import Empresa from './empresa/empresa.js';
import SimularPagamentos from './simular_pagamentos/simular_pagamentos.js';

const routes = [
    { 
        path: '*', 
        component: Base,
        children: [
            {
                path: "/vizinhanca",
                name: "vizinhanca",
                menu: "Vizinhança",
                component: Vizinhanca
            },
            {
                path: "/meu-estabelecimento",
                name: "meu-estabelecimento",
                menu: "Meu Estabelecimento",
                component: MeuEstabelecimento
            },
            {
                path: "/solicitacoes",
                name: "solicitacoes",
                menu: "Solicitações",
                component: Solicitacoes
            },
            {
                path: "/acompanhar-solicitacoes",
                name: "acompanhar-solicitacoes",
                menu: "Acompanhar Solicitações",
                component: AcompanharSolicitacoes
            },
            {
                path: "/oportunidades",
                name: "oportunidades",
                menu: "Oportunidades",
                component: Oportunidades
            },
            {
                path: "/empresa",
                name: "empresa",
                menu: "empresa",
                component: Empresa
            },
        ]
    },
    { path: '/login', component: Login },
    { path: '/cadastro', component: Cadastro },
    { path: '/completar_cadastro', component: CompletarCadastro },
    { path: '/simular_pagamentos', component: SimularPagamentos },
];

const router = new VueRouter({
    routes
});

export default router;