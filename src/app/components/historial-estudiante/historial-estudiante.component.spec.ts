import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialEstudianteComponent } from './historial-estudiante.component';

describe('HistorialEstudianteComponent', () => {
  let component: HistorialEstudianteComponent;
  let fixture: ComponentFixture<HistorialEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialEstudianteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
