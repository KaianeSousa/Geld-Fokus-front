import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNews } from './manage-news';

describe('ManageNews', () => {
  let component: ManageNews;
  let fixture: ComponentFixture<ManageNews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageNews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageNews);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
