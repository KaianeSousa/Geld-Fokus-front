// src/app/core/models/news.model.ts
export interface Tag {
  id: string;
  name: string;
}

export interface News {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  author?: string;
  date?: string; // ISO
  tags?: Tag[];
}
