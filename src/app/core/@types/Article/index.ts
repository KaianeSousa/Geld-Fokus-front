import {User} from '../User';
import {Category} from '../Category';
import {Tag} from '../Tag';
import {ArticleStatus} from '../../enumeration/ArticleStatus';

export interface Article {
    id? : number,
    title : string,
    slug : string,
    subtitle : string,
    content : string,
    coverImage : string,
    articleStatus : ArticleStatus,
    publishedDate : string,
    authorName: User,
    category : Category,
    tagNames : Tag[],
    viewCount : number,
    createdAt : string,
    updatedAt : string
}

