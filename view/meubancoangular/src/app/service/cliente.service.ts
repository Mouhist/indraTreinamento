import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  endpoint = 'clientes/';
  api = environment.api;

  constructor(private http: HttpClient) { }

  listarTodosClientes(): Observable<ICliente[]> {
    return this.http.get<ICliente[]>(`${this.api}/${this.endpoint}`)
  }
  cadastrar(cliente: ICliente){
  return this.http.post(`${this.api}/${this.endpoint}`, cliente);
  }
  remover(id: number){
    return this.http.delete(`${this.api}/${this.endpoint}/${id}`);
  }
  buscarPorId(id: number) {
    return this.http.get<ICliente>(`${this.api}/${this.endpoint}/${id}`);
  }

}
