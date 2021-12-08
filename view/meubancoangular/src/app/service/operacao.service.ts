import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IExtrato } from '../interfaces/extrato';

@Injectable({
  providedIn: 'root'
})
export class OperacaoService {

  endpoint = 'operacoes/';
  api = environment.api;

  constructor(private http: HttpClient) { }

  listarTodosOperacoes(): Observable<IExtrato[]> {
    return this.http.get<IExtrato[]>(`${this.api}/${this.endpoint}`)
  }
  buscaPorAgenciaNumero(agencia: number, numero: number)  {
    return this.http.get<IExtrato[]>(`${this.api}/${this.endpoint}/consultar-operacao/${agencia}/${numero}`);
  }
}
