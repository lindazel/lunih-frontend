import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPostTypeComponent } from './form-post-type.component';

describe('FormPostTypeComponent', () => {
  let component: FormPostTypeComponent;
  let fixture: ComponentFixture<FormPostTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPostTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPostTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
