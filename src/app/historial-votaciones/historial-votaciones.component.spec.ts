import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialVotacionesComponent } from './historial-votaciones.component';

describe('HistorialVotacionesComponent', () => {
  let component: HistorialVotacionesComponent;
  let fixture: ComponentFixture<HistorialVotacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialVotacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialVotacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
