import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IExtrato } from 'src/app/interfaces/extrato';
import { OperacaoService } from 'src/app/service/operacao.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listagem-extrato-conta',
  templateUrl: './listagem-extrato-conta.component.html',
  styleUrls: ['./listagem-extrato-conta.component.css']
})
export class ListagemExtratoContaComponent implements OnInit {

  extrato: IExtrato[] = [];
  numero: number[] = [];
  constructor(private operacaoService: OperacaoService,
    private router: Router) { }

  ngOnInit(): void {
   this.enviar;

  }


  enviar(){
    var agencia = (<HTMLInputElement>document.getElementById("agencia")).value;
    var numero = (<HTMLInputElement>document.getElementById('numero')).value;

    console.log(agencia)
    console.log(numero)
    this.operacaoService.buscaPorAgenciaNumero(Number(agencia), Number(numero)).subscribe((result: IExtrato[]) =>{
      Swal.fire('Funfou!',
      'cadastrado com sucesso',
      'success');
      this.extrato = result;
    }, error =>{
      Swal.fire('ERRO!',
      'error');
    });
  }
  formatarData(date: Date){
    var data = new Date(date);
    var dataFormatada = ((data.getDate() )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear();
    return dataFormatada;
  }

}
