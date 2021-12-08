import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositoComponent } from './pages/caixa-eletronico/deposito/deposito.component';
import { SaqueComponent } from './pages/caixa-eletronico/saque/saque.component';
import { TransferenciaComponent } from './pages/caixa-eletronico/transferencia/transferencia.component';
import { CadastroEdicaoClienteComponent } from './pages/clientes/cadastro-edicao-cliente/cadastro-edicao-cliente.component';
import { ListagemClienteComponent } from './pages/clientes/listagem-cliente/listagem-cliente.component';
import { ListagemContasComponent } from './pages/contas/listagem-contas/listagem-contas.component';
import { ListagemExtratoContaComponent } from './pages/operacao/listagem-extrato-conta/listagem-extrato-conta.component';
import { ListagemTodosExtratoComponent } from './pages/operacao/listagem-todos-extrato/listagem-todos-extrato.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/clientes', pathMatch: 'full'
  },
  {
    path: 'clientes', component: ListagemClienteComponent
  },
  {
    path: 'clientes/cadastrar', component: CadastroEdicaoClienteComponent
  },
  {
    path: 'clientes/editar/:id', component: CadastroEdicaoClienteComponent
  },
  {
    path: 'contas', component: ListagemContasComponent
  },
  {
    path: 'ATM/saque', component: SaqueComponent,
  },
  {
    path: 'ATM/deposito', component: DepositoComponent,
  },
  {
    path: 'ATM/transferencia', component: TransferenciaComponent,
  },
  {
    path: 'operacao/extratoCompleto', component: ListagemTodosExtratoComponent,
  },
  {
    path: 'operacao/extratoConta', component: ListagemExtratoContaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
