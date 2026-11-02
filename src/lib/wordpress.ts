import type {
  WordPressPost,
  PaginatedPosts,
} from "../types/post";
import type { WordPressCategory } from "../types/category";

const WORDPRESS_URL = import.meta.env.VITE_WORDPRESS_URL;

export async function getPosts(
  page = 1,
  perPage = 10
): Promise<WordPressPost[]> {
  if (!WORDPRESS_URL) {
    throw new Error("WordPress URL is not configured.");
  }

  const response = await fetch(
    `${WORDPRESS_URL}/wp-json/wp/v2/posts?_embed&per_page=${perPage}&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch WordPress posts.");
  }

  return response.json() as Promise<WordPressPost[]>;
}

export async function getPostBySlug(
  slug: string
): Promise<WordPressPost> {
  const response = await fetch(
    `${WORDPRESS_URL}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch article.");
  }

  const posts: WordPressPost[] = await response.json();

  if (posts.length === 0) {
    throw new Error("Article not found.");
  }

  return posts[0];
}


export async function getPaginatedPosts(
  page = 1,
  perPage = 3,
  categoryId?: number
): Promise<PaginatedPosts> {
  if (!WORDPRESS_URL) {
    throw new Error("WordPress URL is not configured.");
  }

const params = new URLSearchParams({
  _embed: "",
  per_page: String(perPage),
  page: String(page),
});

if (categoryId !== undefined) {
  params.set("categories", String(categoryId));
}

const response = await fetch(
  `${WORDPRESS_URL}/wp-json/wp/v2/posts?${params.toString()}`
);

  if (!response.ok) {
    throw new Error("Failed to fetch WordPress posts.");
  }

  const posts: WordPressPost[] = await response.json();

  const totalPages = Number(
    response.headers.get("X-WP-TotalPages") ?? 1
  );

  return {
    posts,
    totalPages,
  };
}


export async function getCategories(): Promise<WordPressCategory[]> {
  const response = await fetch(
    `${WORDPRESS_URL}/wp-json/wp/v2/categories?per_page=100`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories.");
  }

  return response.json() as Promise<WordPressCategory[]>;
}