import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksSidebar } from './stocks-sidebar';

describe('StocksSidebar', () => {
  let component: StocksSidebar;
  let fixture: ComponentFixture<StocksSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StocksSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StocksSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
