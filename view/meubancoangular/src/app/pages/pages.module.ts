import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemClienteComponent } from './clientes/listagem-cliente/listagem-cliente.component';
import { CadastroEdicaoClienteComponent } from './clientes/cadastro-edicao-cliente/cadastro-edicao-cliente.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { ListagemContasComponent } from './contas/listagem-contas/listagem-contas.component';
import { ClienteService } from '../service/cliente.service';
import { SaqueComponent } from './caixa-eletronico/saque/saque.component';
import { DepositoComponent } from './caixa-eletronico/deposito/deposito.component';
import { TransferenciaComponent } from './caixa-eletronico/transferencia/transferencia.component';
import { ListagemTodosExtratoComponent } from './operacao/listagem-todos-extrato/listagem-todos-extrato.component';
import { ListagemExtratoContaComponent } from './operacao/listagem-extrato-conta/listagem-extrato-conta.component';



@NgModule({
  declarations: [
    ListagemClienteComponent,
    CadastroEdicaoClienteComponent,
    ListagemContasComponent,
    SaqueComponent,
    DepositoComponent,
    TransferenciaComponent,
    ListagemTodosExtratoComponent,
    ListagemExtratoContaComponent
  ],
  providers: [
    ClienteService,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
