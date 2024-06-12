import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelecaoInicialComponent } from './selecao-inicial/selecao-inicial.component';
import { VotacaoComponent } from './votacao/votacao.component';
import { GerenciamentoPautasComponent } from './gerenciamento-pautas/gerenciamento-pautas.component';
import { CadastroLoginComponent } from './cadastro-login/cadastro-login.component';

const routes: Routes = [
  { path: '', redirectTo: '/selecao-inicial', pathMatch: 'full' },
  { path: 'selecao-inicial', component: SelecaoInicialComponent },
  { path: 'votacao', component: VotacaoComponent },
  { path: 'cadastro-login', component: CadastroLoginComponent },
  { path: 'gerenciamento-pautas', component: GerenciamentoPautasComponent },
  // Outras rotas
  { path: '**', redirectTo: '/selecao-inicial' } // Rota padrão para redirecionar para a tela inicial
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
