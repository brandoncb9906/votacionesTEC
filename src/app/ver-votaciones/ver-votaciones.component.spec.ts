import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerVotacionesComponent } from './ver-votaciones.component';

describe('VerVotacionesComponent', () => {
  let component: VerVotacionesComponent;
  let fixture: ComponentFixture<VerVotacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerVotacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerVotacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
