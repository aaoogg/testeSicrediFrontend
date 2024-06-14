import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-cadastro-login',
  templateUrl: './cadastro-login.component.html',
  styleUrls: ['./cadastro-login.component.css']
})
export class CadastroLoginComponent {
  usuario: string = '';
  senha: string = '';
  repetirSenha: string = '';
  usuarioCadastro: string = '';
  senhaCadastro: string = '';
  confirmarSenha: string = '';
  exibirCadastro: boolean = false;
  usuarioJaCadastrado = false;

  constructor(private router: Router, private backendService: BackendService) {}

  logar() {
    this.backendService.login(this.usuario, this.senha).subscribe(
      response => {
        console.log('Login realizado com sucesso:', response);
        //localStorage.setItem('usuarioLogado', response.usuarioId.toString());
        console.log('Redirecionando para /votacao');
        this.router.navigate(['/votacao']).then(success => {
          console.log('Navegação bem-sucedida:', success);
        }).catch(err => {
          console.error('Erro na navegação:', err);
        });
      },
      error => {
        console.error('Erro ao realizar login:', error);
        // Tratamento de erro, exibir mensagem ao usuário, etc.
      }
    );
  }

  cadastrar() {
    if (this.senhaCadastro !== this.confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }
  
    this.backendService.cadastrarUsuario(this.usuarioCadastro, this.senhaCadastro).subscribe(
      response => {
        console.log('Usuário cadastrado com sucesso:', response);
        // Redireciona para a tela de votação se o cadastro for bem-sucedido (status 201)
        if (response) {
          localStorage.setItem('usuarioLogado', response.id);
          this.router.navigate(['/votacao']);
        }        
      },
      error => {
        if(error.status === 409){
          this.usuarioJaCadastrado = true;
          console.error('Este usuário já está cadastrado', error);
        }
      }
    );
  }
  

  irParaCadastro() {
    this.exibirCadastro = true;
  }
}
