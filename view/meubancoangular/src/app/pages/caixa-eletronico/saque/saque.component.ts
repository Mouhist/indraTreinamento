import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ISaqueDeposito } from 'src/app/interfaces/saque-deposito';
import { ContasService } from 'src/app/service/contas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-saque',
  templateUrl: './saque.component.html',
  styleUrls: ['./saque.component.css']
})
export class SaqueComponent implements OnInit {

  formValue: FormGroup = new FormGroup({
    agencia: new FormControl('', Validators.required),
    numeroConta: new FormControl('', Validators.required),
    valor: new FormControl(''),
  });

  constructor(private contasService: ContasService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  enviar(){
    const conta: ISaqueDeposito = this.formValue.value;
    this.contasService.saque(conta).subscribe(result =>{
      Swal.fire('Ótimo!',
      'Saque realizado com sucesso',
      'success');
      this.router.navigate(['/contas']);
    }, error => {
      Swal.fire('Ish!',
      'Houve algum erro ao tentar sacar, tente novamente',
      'error');
    });
  }

}
