import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemExtratoContaComponent } from './listagem-extrato-conta.component';

describe('ListagemExtratoContaComponent', () => {
  let component: ListagemExtratoContaComponent;
  let fixture: ComponentFixture<ListagemExtratoContaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemExtratoContaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemExtratoContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
