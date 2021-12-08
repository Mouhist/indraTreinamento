import { Component, OnInit } from '@angular/core';
import { ContasService } from 'src/app/service/contas.service';

@Component({
  selector: 'app-listagem-contas',
  templateUrl: './listagem-contas.component.html',
  styleUrls: ['./listagem-contas.component.css']
})
export class ListagemContasComponent implements OnInit {

  contas: any[] = [];
  constructor(private contasService: ContasService) { }

  ngOnInit(): void {
    this.contasService.listarTodosClientes().subscribe((result: any) =>{
      this.contas = result

    });
  }
}
