import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-edicao-cliente',
  templateUrl: './cadastro-edicao-cliente.component.html',
  styleUrls: ['./cadastro-edicao-cliente.component.css']
})
export class CadastroEdicaoClienteComponent implements OnInit {
  formValue: FormGroup = new FormGroup({
    id: new FormControl(null),
    nome: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    observacoes: new FormControl(''),
    ativo: new FormControl(true)
  });
  constructor(private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(Number(id)){
      this.clienteService.buscarPorId(Number(id)).subscribe((resultCliente: ICliente) => {
        this.preencheFormValue(resultCliente);
      }, error => {
        console.error(error);
      });
    }
  }

  preencheFormValue(cliente: ICliente) {
    this.formValue = new FormGroup({
      id: new FormControl(cliente.id),
      nome: new FormControl(cliente.nome, Validators.required),
      cpf: new FormControl(cliente.cpf, Validators.required),
      email: new FormControl(cliente.email, [Validators.required, Validators.email]),
      observacoes: new FormControl(cliente.observacoes),
      ativo: new FormControl(cliente.ativo),
    })
  }

  enviar(){
    const cliente: ICliente = this.formValue.value;
    this.clienteService.cadastrar(cliente).subscribe(result =>{
       Swal.fire('Muito bem!',
      'Você foi cadastrado com sucesso',
      'success');
      this.router.navigate(['/clientes']);
    }, error => {
      console.error(error.detalhes);
      Swal.fire(
      'Algo deu errado!',
      'error');
    });
  }

}
