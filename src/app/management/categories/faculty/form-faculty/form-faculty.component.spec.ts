import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFacultyComponent } from './form-faculty.component';

describe('FormFacultyComponent', () => {
  let component: FormFacultyComponent;
  let fixture: ComponentFixture<FormFacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFacultyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
