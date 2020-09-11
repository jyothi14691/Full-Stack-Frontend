import { PostContent } from './postcontent';

export interface Post {
	post_Id: string;
	userName: string;
	tag: string;
	postContent: PostContent;
}
