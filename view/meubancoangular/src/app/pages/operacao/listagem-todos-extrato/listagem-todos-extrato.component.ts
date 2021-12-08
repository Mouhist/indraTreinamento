import { Component, OnInit } from '@angular/core';
import { IExtrato } from 'src/app/interfaces/extrato';
import { OperacaoService } from 'src/app/service/operacao.service';

@Component({
  selector: 'app-listagem-todos-extrato',
  templateUrl: './listagem-todos-extrato.component.html',
  styleUrls: ['./listagem-todos-extrato.component.css']
})
export class ListagemTodosExtratoComponent implements OnInit {

  extrato: IExtrato[] = [];
  constructor(private operacaoService: OperacaoService) { }

  ngOnInit(): void {
    this.operacaoService.listarTodosOperacoes().subscribe((result: IExtrato[]) => {
      this.extrato = result;
    });
  }
  formatarData(date: Date){
    var data = new Date(date);
    var dataFormatada = ((data.getDate() )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear();
    return dataFormatada;
  }

}
