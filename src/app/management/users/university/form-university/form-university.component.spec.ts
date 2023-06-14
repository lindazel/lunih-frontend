import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUniversityComponent } from './form-university.component';

describe('FormUniversityComponent', () => {
  let component: FormUniversityComponent;
  let fixture: ComponentFixture<FormUniversityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUniversityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUniversityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
