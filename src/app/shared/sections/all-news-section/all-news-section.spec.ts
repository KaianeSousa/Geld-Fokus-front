import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNewsSection } from './all-news-section';

describe('AllNewsSection', () => {
  let component: AllNewsSection;
  let fixture: ComponentFixture<AllNewsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllNewsSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllNewsSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
