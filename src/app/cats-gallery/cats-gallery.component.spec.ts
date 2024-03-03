import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatsGalleryComponent } from './cats-gallery.component';

describe('CatsGalleryComponent', () => {
  let component: CatsGalleryComponent;
  let fixture: ComponentFixture<CatsGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatsGalleryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatsGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
