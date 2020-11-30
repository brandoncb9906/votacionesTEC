import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialVotacionesDetalleComponent } from './historial-votaciones-detalle.component';

describe('HistorialVotacionesDetalleComponent', () => {
  let component: HistorialVotacionesDetalleComponent;
  let fixture: ComponentFixture<HistorialVotacionesDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialVotacionesDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialVotacionesDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
