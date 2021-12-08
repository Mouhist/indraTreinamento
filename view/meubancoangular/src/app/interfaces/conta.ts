import { ICliente } from "./cliente";

export interface IConta {
  id: number;
  agencia: string;
  numero: string;
  saldo: number;
  cliente: ICliente;
}
