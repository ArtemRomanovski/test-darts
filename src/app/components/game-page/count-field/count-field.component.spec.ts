import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountFieldComponent } from './count-field.component';

describe('CountFieldComponent', () => {
  let component: CountFieldComponent;
  let fixture: ComponentFixture<CountFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
