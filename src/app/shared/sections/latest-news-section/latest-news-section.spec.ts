import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestNewsSection } from './latest-news-section';

describe('LatestNewsSection', () => {
  let component: LatestNewsSection;
  let fixture: ComponentFixture<LatestNewsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestNewsSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestNewsSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
