import { TestBed } from '@angular/core/testing';

import { CatsGalleryService } from './cats-gallery.service';

describe('CatsGalleryService', () => {
  let service: CatsGalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatsGalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
