import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidadesPontosComponent } from './validades-pontos.component';

describe('ValidadesPontosComponent', () => {
  let component: ValidadesPontosComponent;
  let fixture: ComponentFixture<ValidadesPontosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidadesPontosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidadesPontosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
