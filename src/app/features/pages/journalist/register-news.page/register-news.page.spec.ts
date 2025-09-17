import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNewsPage } from './register-news.page';

describe('RegisterNewsPage', () => {
  let component: RegisterNewsPage;
  let fixture: ComponentFixture<RegisterNewsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterNewsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterNewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
