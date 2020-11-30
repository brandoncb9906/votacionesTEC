import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotantesComponent } from './votantes.component';

describe('VotantesComponent', () => {
  let component: VotantesComponent;
  let fixture: ComponentFixture<VotantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
