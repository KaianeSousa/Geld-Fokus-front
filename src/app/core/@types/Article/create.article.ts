import { ArticleStatus } from "../../enumeration/ArticleStatus"

export interface CreateArticle {
   title: string,
   subtitle: string,
   content: string,
   slug: string,
   authorName : string,
   articleStatus: ArticleStatus,
   categoryName: string,
   tagNames: string[]
}