import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaRealizadoComponent } from './agenda-realizado.component';

describe('AgendaRealizadoComponent', () => {
  let component: AgendaRealizadoComponent;
  let fixture: ComponentFixture<AgendaRealizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendaRealizadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaRealizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
