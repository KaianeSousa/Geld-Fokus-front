import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { ManageNavbar } from './manage-navbar';

describe('ManageNavbar', () => {
  let component: ManageNavbar;
  let fixture: ComponentFixture<ManageNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ManageNavbar,
        RouterTestingModule.withRoutes([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageNavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar 3 links de navegação', () => {
    const links = fixture.debugElement.queryAll(By.css('nav ul li a'));
    expect(links.length).toBe(3);
  });

  it('deve conter o link "Adicionar" com routerLink="/register-news"', () => {
    const link = fixture.debugElement.queryAll(By.css('a'))[0];
    expect(link.nativeElement.textContent.trim()).toBe('Adicionar');
    expect(link.attributes['ng-reflect-router-link']).toBe('/register-news');
  });

  it('deve conter o link "Buscar" com routerLink="/query-news"', () => {
    const link = fixture.debugElement.queryAll(By.css('a'))[1];
    expect(link.nativeElement.textContent.trim()).toBe('Buscar');
    expect(link.attributes['ng-reflect-router-link']).toBe('/query-news');
  });

  it('deve conter o link "Gerenciar" com routerLink="/manage-news"', () => {
    const link = fixture.debugElement.queryAll(By.css('a'))[2];
    expect(link.nativeElement.textContent.trim()).toBe('Gerenciar');
    expect(link.attributes['ng-reflect-router-link']).toBe('/manage-news');
  });
});
