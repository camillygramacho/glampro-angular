import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicoLayoutComponent } from './servico-layout.component';

describe('ServicoLayoutComponent', () => {
  let component: ServicoLayoutComponent;
  let fixture: ComponentFixture<ServicoLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicoLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicoLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
