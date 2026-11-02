import type { WordPressPost } from "../types/post";
import PostCard from "./PostCard";

interface PostListProps {
  posts: WordPressPost[];
}

function PostList({ posts }: PostListProps) {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;