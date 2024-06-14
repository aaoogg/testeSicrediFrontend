/**
 * Author: Antônio Oscar Gehrke
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selecao-inicial',
  templateUrl: './selecao-inicial.component.html',
  styleUrls: ['./selecao-inicial.component.css']
})
export class SelecaoInicialComponent {

  constructor(private router: Router) { }

  irParaVotacao() {
    this.router.navigate(['/votacao']);
  }

  irParaGerenciamentoPautas() {
    this.router.navigate(['/gerenciamento-pautas']);
  }
}
