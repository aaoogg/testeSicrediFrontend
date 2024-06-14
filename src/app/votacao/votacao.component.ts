/**
 * Author: Antônio Oscar Gehrke
 */

import { Component } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-votacao',
  templateUrl: './votacao.component.html',
  styleUrls: ['./votacao.component.css']
})
export class VotacaoComponent {
  pauta: any = null;
  mensagem: string = '';
  votoRegistrado: boolean = false;
  idPautaParaVotar: number = 0;

  constructor(private backendService: BackendService) { }

  buscarPautaById(idPauta: number) {
    this.backendService.getPautaById(idPauta).subscribe(
      response => {
        this.pauta = response;
        this.mensagem = '';
        this.verificarVoto();
      },
      error => {
        this.mensagem = 'Pauta não encontrada';
        this.pauta = null;
      }
    );
  }

  votar(voto: boolean) {
    const usuarioLogado = Number(localStorage.getItem('usuarioLogado'));
    if (this.pauta && this.pauta.pautaEmVotacao && !this.votoRegistrado) {
      this.backendService.votar(this.pauta.id, voto, usuarioLogado).subscribe(
        () => {
          this.mensagem = 'Voto registrado com sucesso';
          this.verificarVoto();
          this.votoRegistrado = true;
        },
        error => {
          if (error.status === 201) {
            this.mensagem = 'Voto registrado com sucesso';
            this.verificarVoto();
            this.votoRegistrado = true;
          } else {
            console.error('Erro ao registrar voto:', error);
            this.mensagem = 'Erro ao registrar voto';
          }
        }
      );
    } else {
      this.mensagem = 'Não é possível votar nesta pauta';
    }
  }


  verificarVoto() {
    if (this.pauta) {
      this.backendService.verificarVoto(this.pauta.id).subscribe(
        response => {
          this.votoRegistrado = response;
        },
        error => {
          console.error('Erro ao verificar voto:', error);
        }
      );
    }
  }
}
