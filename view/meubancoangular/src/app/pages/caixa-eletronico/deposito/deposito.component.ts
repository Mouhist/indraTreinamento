import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISaqueDeposito } from 'src/app/interfaces/saque-deposito';
import { ContasService } from 'src/app/service/contas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css']
})
export class DepositoComponent implements OnInit {

  formValue: FormGroup = new FormGroup({
    agencia: new FormControl('', Validators.required),
    numeroConta: new FormControl('', Validators.required),
    valor: new FormControl(''),
  });

  constructor(private contaService: ContasService,
    private router: Router) { }

  ngOnInit(): void {
  }

  enviar(){
    const conta: ISaqueDeposito = this.formValue.value;
    this.contaService.deposito(conta).subscribe(result =>{
      Swal.fire('Ótimo!',
      'Deposito realizado com sucesso',
      'success');
      this.router.navigate(['/contas'])
    }, error => {
      Swal.fire('Ops!',
      'Ocorreu algum erro ao tentar depositar, tente novamente.',
      'error'
      );
    })
  }

}
