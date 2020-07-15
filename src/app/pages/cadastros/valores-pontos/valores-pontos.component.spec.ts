import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoresPontosComponent } from './valores-pontos.component';

describe('ValoresPontosComponent', () => {
  let component: ValoresPontosComponent;
  let fixture: ComponentFixture<ValoresPontosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValoresPontosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValoresPontosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
