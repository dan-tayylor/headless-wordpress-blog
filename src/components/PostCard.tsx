import type { WordPressPost } from "../types/post";
import { Link } from "react-router";

interface PostCardProps {
  post: WordPressPost;
}

function PostCard({ post }: PostCardProps) {
  const publishedDate = new Date(post.date).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const featuredImage =
  post._embedded?.["wp:featuredmedia"]?.[0];

  const categories =
  post._embedded?.["wp:term"]?.[0] ?? [];

  return (
  <article className="post-card">
    {featuredImage && (
      <img
        className="post-image"
        src={featuredImage.source_url}
        alt={featuredImage.alt_text}
        loading="lazy"
      />
    )}

    <p className="post-date">{publishedDate}</p>

    {categories.length > 0 && (
      <div className="post-categories">
        {categories.map((category) => (
          <span key={category.id}>
            {category.name}
          </span>
        ))}
      </div>
    )}

    <h2>
      <Link to={`/articles/${post.slug}`}>
        {post.title.rendered}
      </Link>
    </h2>

    <div
      className="post-excerpt"
      dangerouslySetInnerHTML={{
        __html: post.excerpt.rendered,
      }}
    />
  </article>
);
}

export default PostCard;