import { IConta } from "./conta";

export interface IExtrato {
  conta: IConta;
  dataHora: Date;
  id: number;
  observacao: string;
  tpOperacao: string;
  valor: number;
}
