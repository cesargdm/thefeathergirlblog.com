import Post from './Post';

interface PathContext {
  tags?: string[];
  categories?: string[];
  categoryName: string;
  tagName?: string;
  posts?: Post[];
  post?: Post;
}

export default PathContext;
