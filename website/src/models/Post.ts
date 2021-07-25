import Frontmatter from './Frontmatter';

interface Post {
  id: number;
  excerpt: string;
  html: string;
  frontmatter: Frontmatter;
}

export default Post;
