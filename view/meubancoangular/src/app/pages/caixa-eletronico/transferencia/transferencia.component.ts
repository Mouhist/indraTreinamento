import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ITransferencia } from 'src/app/interfaces/transferencia';
import { ContasService } from 'src/app/service/contas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {

  formValue: FormGroup = new FormGroup({
    agenciaDestino: new FormControl('', Validators.required),
    agenciaOrigem: new FormControl('', Validators.required),
    numeroContaDestino: new FormControl('', Validators.required),
    numeroContaOrigem: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required)
  });

  constructor(private contaService: ContasService,
    private router: Router) { }

  ngOnInit(): void {
  }

  enviar(){
    const conta: ITransferencia = this.formValue.value;
    this.contaService.transferir(conta).subscribe(result =>{
      Swal.fire(
      'Muito bom!',
      'Transferência feita com sucesso',
      'success');
      this.router.navigate(['/contas']);
    }, error => {
      Swal.fire(
      'Ops!',
      'Algo deu errado! Tente novamente',
      'error'
      );
    })
  }

}
