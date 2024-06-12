import { Component } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-votacao',
  templateUrl: './votacao.component.html',
  styleUrls: ['./votacao.component.css']
})
export class VotacaoComponent {
  pautas: any[] = [];
  pautaSelecionada: any;
  idPautaParaVotar: number = 0;
  mensagem: string = '';

  constructor(private backendService: BackendService) {}

  buscarPauta() {
    this.backendService.getPautas().subscribe(pautas => {
      this.pautas = pautas;
      this.pautaSelecionada = this.pautas.find(p => p.id === this.idPautaParaVotar);
      if (!this.pautaSelecionada) {
        this.mensagem = 'Pauta não encontrada';
      } else if (this.pautaSelecionada.votacaoFinalizada) {
        this.mensagem = 'Esta pauta já foi finalizada';
      }
    });
  }

  votar(voto: boolean) {
    if (this.pautaSelecionada && !this.pautaSelecionada.votacaoFinalizada && this.pautaSelecionada.pautaEmVotacao) {
      this.backendService.votar(this.pautaSelecionada.id, voto).subscribe(() => {
        this.mensagem = 'Voto registrado com sucesso';
        this.buscarPauta(); // Atualizar a pauta após o voto
      });
    } else {
      this.mensagem = 'Não é possível votar nesta pauta';
    }
  }
}
