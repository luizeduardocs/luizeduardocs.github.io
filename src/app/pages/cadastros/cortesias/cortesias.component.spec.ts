import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CortesiasComponent } from './cortesias.component';

describe('CortesiasComponent', () => {
  let component: CortesiasComponent;
  let fixture: ComponentFixture<CortesiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CortesiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CortesiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
