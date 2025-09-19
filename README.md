# Geld Fokus

Este projeto é um trabalho da disciplina Programação Web II. Se trata de um site de notícias com a temática financeira cujo nome significa "focar em dinheiro", onde jornalista e editor ter perimissão para postar  notícias e gerenciá-las, cada qual com limitações. Ele também faz uso da API __________ para exibir dados e gráficos em cardes laterais e o usuário ficar por dentro das mudanças na bolsa de valores.
Plataforma de gerenciamento de notícias desenvolvida com foco em desempenho, organização de código e escalabilidade.

## Tecnologias Utilizadas

- **Backend:** Kotlin com Spring Boot  
- **Banco de Dados:** MongoDB 
- **Frontend:** Framework Angular 20  
- **Estilos:** SCSS
- **Estrutura de páginas:** HTML5  

## Requisitos

Para execução do projeto, é necessário ter instalados no ambiente de desenvolvimento:

- [Node.js](https://nodejs.org/)  
- [Angular CLI](https://angular.io/cli)
- [Docker](https://www.docker.com/)

## Estrutura do projeto
### Frontend
```bash
src/
 └── app/
     ├── core/
     │   ├── @types/
     │   │   ├── Article
     │   │   ├── Category
     │   │   ├── Pagination
     │   │   ├── Stock
     │   │   ├── Tag
     │   │   ├── Toast
     │   │   ├── User
     │   │   └── UserRegister
     │   ├── enumeration
     │   ├── guards
     │   ├── interceptors
     │   └── services
     │
     ├── features/
     │   ├── layouts/
     │   │   ├── default-layout
     │   │   └── empty-layout
     │   └── pages/
     │       ├── authentication
     │       ├── common
     │       ├── editor
     │       ├── journalist
     │       └── visitor
     │
     ├── shared/
     │   ├── components/
     │   │   ├── footer
     │   │   ├── manage-navbar
     │   │   ├── navbar
     │   │   ├── news-card
     │   │   ├── news-carousel
     │   │   ├── search-news
     │   │   ├── stock-chart
     │   │   ├── stock-widget
     │   │   ├── stocks-sidebar
     │   │   ├── tab
     │   │   ├── title-section
     │   │   ├── toast
     │   │   ├── toast-container
     │   │   └── user-menu.component
     │   └── sections/
     │       ├── all-news-section
     │       ├── comments-section
     │       └── latest-news-section
     │
     ├── app.config.ts
     ├── app.html
     ├── app.routes.ts
     ├── app.scss
     └── app.ts
 │
 ├── assets/
 ├── _mixins.scss
 ├── index.html
 ├── main.ts
 └── styles.scss
```

## Configuração e Execução

### Banco de Dados
O banco de dados MongoDB é executado em container. Para iniciar:  
```bash
docker-compose up -d
```

