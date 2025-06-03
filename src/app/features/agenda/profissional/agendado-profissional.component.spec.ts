import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgendadoProfissionalComponent } from './agendado-profissional.component';



describe('AgendadoProfissionalComponent', () => {
  let component: AgendadoProfissionalComponent;
  let fixture: ComponentFixture<AgendadoProfissionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendadoProfissionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendadoProfissionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
