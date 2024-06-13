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

  getPautaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pautas/${id}`);
  }

  votar(idPauta: number, voto: boolean, usuarioId: number): Observable<any> {
    const votoData = { voto, usuarioId };
    return this.http.post<any>(`${this.baseUrl}/pautas/${idPauta}/votar`, votoData);
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

  verificarVoto(idPauta: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/pautas/${idPauta}/verificarVoto`);
  }
  
  login(usuario: string, senha: string): Observable<any> {
    const body = { usuario, senha };
    return this.http.post<any>(`${this.baseUrl}/usuarios/login`, body);
  }

  cadastrarUsuario(usuario: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/usuarios/cadastrar`, { usuario, senha }); // Ajusta o endpoint para /api/usuarios
  }

  buscarUsuario(usuario: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/usuarios/${usuario}`); // Ajusta o endpoint para /api/usuarios/{usuario}
  }
}
