export * from './comment.service';
import { CommentApiService } from './comment.service';
export * from './post.service';
import { PostApiService } from './post.service';
export * from './security.service';
import { SecurityApiService } from './security.service';
export const APIS = [CommentApiService, PostApiService, SecurityApiService];
