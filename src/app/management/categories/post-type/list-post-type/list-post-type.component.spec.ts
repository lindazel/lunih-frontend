import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPostTypeComponent } from './list-post-type.component';

describe('ListPostTypeComponent', () => {
  let component: ListPostTypeComponent;
  let fixture: ComponentFixture<ListPostTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPostTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPostTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
