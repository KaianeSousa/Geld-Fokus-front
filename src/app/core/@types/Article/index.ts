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
    author: User,
    category : Category,
    tags : Tag[],
    viewCount : number,
    createdAt : string,
    updatedAt : string
}

