import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIndustryComponent } from './form-industry.component';

describe('FormIndustryComponent', () => {
  let component: FormIndustryComponent;
  let fixture: ComponentFixture<FormIndustryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormIndustryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormIndustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
