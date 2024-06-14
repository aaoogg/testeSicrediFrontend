/**
 * Author: Antônio Oscar Gehrke
 */

import { Component } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-gerenciamento-pautas',
  templateUrl: './gerenciamento-pautas.component.html',
  styleUrls: ['./gerenciamento-pautas.component.css']
})
export class GerenciamentoPautasComponent {
  pautas: any[] = [];
  newPauta: string = '';

  constructor(private backendService: BackendService) {
  }

  ngOnInit() {
    this.buscarPautas();
  }

  buscarPautas() {
    this.backendService.getPautas().subscribe(pautas => {
      this.pautas = pautas;
    });
  }

  cadastrarPauta() {
    this.backendService.cadastrarPauta(this.newPauta).subscribe(pauta => {
      this.pautas.push(pauta);
      this.newPauta = '';
    });
  }

  iniciarVotacao(id: number) {
    this.backendService.iniciarVotacao(id).subscribe(() => {
      this.buscarPautas();
    });
  }

  encerrarVotacao(id: number) {
    this.backendService.encerrarVotacao(id).subscribe(() => {
      this.buscarPautas();
    });
  }
}
