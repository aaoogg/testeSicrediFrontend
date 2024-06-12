import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelecaoInicialComponent } from './selecao-inicial/selecao-inicial.component';
import { GerenciamentoPautasComponent } from './gerenciamento-pautas/gerenciamento-pautas.component';
import { VotacaoComponent } from './votacao/votacao.component';
import { CadastroLoginComponent } from './cadastro-login/cadastro-login.component';
import { BackendService } from './backend.service';

@NgModule({
  declarations: [
    AppComponent,
    SelecaoInicialComponent,
    GerenciamentoPautasComponent,
    VotacaoComponent,
    CadastroLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
