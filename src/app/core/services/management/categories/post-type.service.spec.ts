import { TestBed } from '@angular/core/testing';

import { PostTypeService } from './post-type.service';

describe('PostTypeService', () => {
  let service: PostTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
