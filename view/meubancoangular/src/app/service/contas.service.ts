import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IConta } from '../interfaces/conta';
import { ISaqueDeposito } from '../interfaces/saque-deposito';
import { ITransferencia } from '../interfaces/transferencia';

@Injectable({
  providedIn: 'root'
})
export class ContasService {

  endpoint = 'contas/';
  api = environment.api;

  constructor(private http: HttpClient) { }

  listarTodosClientes(): Observable<IConta[]>{
    return this.http.get<IConta[]>(`${this.api}/${this.endpoint}/`)
  }

  saque(saque: ISaqueDeposito) {
    return this.http.post(`${this.api}/${this.endpoint}/saque/`, saque);
  }
  deposito(deposito: ISaqueDeposito) {
    return this.http.post(`${this.api}/${this.endpoint}/deposito/`, deposito);
  }
  transferir(transferir: ITransferencia) {
    return this.http.post(`${this.api}/${this.endpoint}/transferencia/`, transferir);
  }
}
