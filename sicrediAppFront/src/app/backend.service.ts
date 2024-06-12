import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // Adicionar outros métodos
  getPautas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/pautas`);
  }

  cadastrarPauta(nome: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/pautas`, { nome });
  }

  iniciarVotacao(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/pautas/${id}/iniciar-votacao`, {});
  }

  encerrarVotacao(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/pautas/${id}/encerrar-votacao`, {});
  }

  votar(id: number, voto: boolean): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/pautas/${id}/votar`, { voto });
  }

  // Exemplo de função para login de votante
  login(usuario: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { usuario, senha });
  }

  cadastrarUsuario(usuario: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/usuarios`, { usuario, senha }); // Ajusta o endpoint para /api/usuarios
  }

  buscarUsuario(usuario: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/usuarios/${usuario}`); // Ajusta o endpoint para /api/usuarios/{usuario}
  }
}
