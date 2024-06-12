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

  constructor(private router: Router, private backendService: BackendService) {}

  logar() {
    this.backendService.login(this.usuario, this.senha).subscribe(
      response => {
        console.log('Login realizado com sucesso:', response);
        // Lógica adicional após o login, como redirecionamento ou armazenamento do token de sessão
        this.router.navigate(['/votacao']); // Exemplo de redirecionamento após login
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
        // Lógica adicional após o cadastro, como redirecionamento ou feedback ao usuário
      },
      error => {
        console.error('Erro ao cadastrar usuário:', error);
        // Tratamento de erro, exibir mensagem ao usuário, etc.
      }
    );
  }

  irParaCadastro() {
    this.exibirCadastro = true;
  }
}
