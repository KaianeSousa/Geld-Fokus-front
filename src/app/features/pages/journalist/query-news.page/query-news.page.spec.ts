import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryNewsPage } from './query-news.page';

describe('QueryNewsPage', () => {
  let component: QueryNewsPage;
  let fixture: ComponentFixture<QueryNewsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryNewsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryNewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
