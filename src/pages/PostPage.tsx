import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getPostBySlug } from "../lib/wordpress";
import type { WordPressPost } from "../types/post";

function PostPage() {
  const { slug } = useParams<{ slug: string }>();

  const [post, setPost] = useState<WordPressPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPost() {
      try {
        if (!slug) {
          throw new Error("Article not found.");
        }

        const result = await getPostBySlug(slug);
        setPost(result);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load article."
        );
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [slug]);

  if (loading) {
    return <main className="site-container">Loading article...</main>;
  }

  if (error || !post) {
    return (
      <main className="site-container">
        <h1>Article not found</h1>
        <Link to="/">Return to the homepage</Link>
      </main>
    );
  }

  return (
    <main className="site-container">
      <Link to="/" className="back-link">
        ← All articles
      </Link>

      <article className="single-post">
        <p className="post-date">
          {new Date(post.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <h1>{post.title.rendered}</h1>

        <div
          className="post-content"
          dangerouslySetInnerHTML={{
            __html: post.content.rendered,
          }}
        />
      </article>
    </main>
  );
}

export default PostPage;