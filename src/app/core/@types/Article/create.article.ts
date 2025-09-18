import { ArticleStatus } from "../../enumeration/ArticleStatus"

export interface CreateArticle {
   title: string,
   subtitle: string,
   content: string,
   articleStatus: ArticleStatus,
   categoryName: string,
   tagNames: string[]
}
