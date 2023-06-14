import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIndustryComponent } from './list-industry.component';

describe('ListIndustryComponent', () => {
  let component: ListIndustryComponent;
  let fixture: ComponentFixture<ListIndustryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListIndustryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListIndustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
