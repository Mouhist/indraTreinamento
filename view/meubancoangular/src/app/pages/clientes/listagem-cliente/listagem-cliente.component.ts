import { Component, OnInit } from '@angular/core';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listagem-cliente',
  templateUrl: './listagem-cliente.component.html',
  styleUrls: ['./listagem-cliente.component.css']
})
export class ListagemClienteComponent implements OnInit {

  clientes: ICliente[] = [];
  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos() {

    this.clienteService.listarTodosClientes().subscribe((result: ICliente[]) => {
      this.clientes = result

    });

  }
  confirmar(id: number) {
    Swal.fire({
      title: 'are you sure about that?',
      text: "you won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.remover(id).subscribe(result => {
          this.listarTodos();
          Swal.fire(
            'Deleted!',
            'your files has been deleted.',
            'success'
          )
        }, error => {
          console.log(error);
        });

      }
    });

  }

}
