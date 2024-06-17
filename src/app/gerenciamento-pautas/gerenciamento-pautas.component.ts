import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-gerenciamento-pautas',
  templateUrl: './gerenciamento-pautas.component.html',
  styleUrls: ['./gerenciamento-pautas.component.css']
})
export class GerenciamentoPautasComponent {
  pautas: any[] = [];
  newPauta: string = '';
  private contadorSubscription: Subscription | null = null;

  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.buscarPautas();
  }

  buscarPautas() {
    this.backendService.getPautas().subscribe(pautas => {
      this.pautas = pautas.map(pauta => ({
        ...pauta,
        contador: 0,
        mensagem: '',
        tempoVotacao: 0,  // Adicionado para armazenar o tempo de votação
        usarTempoPadrao: true  // Define o valor padrão como true inicialmente
      }));
    });
  }

  cadastrarPauta() {
    this.backendService.cadastrarPauta(this.newPauta).subscribe(pauta => {
      this.pautas.push({
        ...pauta,
        contador: 0,
        mensagem: '',
        tempoVotacao: 0,  // Inicializado como zero para novas pautas
        usarTempoPadrao: true
      });
      this.newPauta = '';
    });
  }

  iniciarVotacao(id: number, tempoVotacao: number) {
    this.backendService.iniciarVotacao(id, tempoVotacao).subscribe(() => {
      const pauta = this.pautas.find(p => p.id === id);
      if (pauta) {
        pauta.pautaEmVotacao = true;
        pauta.contador = pauta.usarTempoPadrao ? 60 : tempoVotacao * 60; // Converte minutos para segundos
        pauta.mensagem = 'A votação foi iniciada';

        this.contadorSubscription = interval(1000).subscribe(() => {
          if (pauta.contador > 0) {
            pauta.contador--;
          } else {
            this.atualizarPautaAposEncerramento(pauta);
          }
        });
      }
    });
  }

  encerrarVotacao(id: number) {
    this.backendService.encerrarVotacao(id).subscribe(() => {
      const pauta = this.pautas.find(p => p.id === id);
      if (pauta) {
        this.atualizarPautaAposEncerramento(pauta);
      }
    });
  }

  atualizarPautaAposEncerramento(pauta: any) {
    pauta.pautaEmVotacao = false;
    pauta.votacaoFinalizada = true;
    pauta.mensagem = 'A votação foi encerrada';
    pauta.contador = 0;
    pauta.tempoVotacao = 0; // Zera o tempo de votação após encerrar
    pauta.usarTempoPadrao = true; // Retorna ao valor padrão após encerrar
    if (this.contadorSubscription) {
      this.contadorSubscription.unsubscribe();
    }
  }

  onCheckboxChange(pauta: any) {
    if (pauta.usarTempoPadrao) {
      pauta.tempoVotacao = 0; // Zera o campo de tempo de votação se selecionar o padrão
    }
  }
}
