import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacotesBeneficiosComponent } from './pacotes-beneficios.component';

describe('PacotesBeneficiosComponent', () => {
  let component: PacotesBeneficiosComponent;
  let fixture: ComponentFixture<PacotesBeneficiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacotesBeneficiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacotesBeneficiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
