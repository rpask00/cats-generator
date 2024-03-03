import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatElementComponent } from './cat-element.component';

describe('CatElementComponent', () => {
  let component: CatElementComponent;
  let fixture: ComponentFixture<CatElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
