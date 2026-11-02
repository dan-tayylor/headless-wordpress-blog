export interface WordPressPost {
  id: number;
  date: string;
  slug: string;
  link: string;

  title: {
    rendered: string;
  };

  excerpt: {
    rendered: string;
  };

  content: {
    rendered: string;
  };

  categories: number[];

  _embedded?: {
    "wp:featuredmedia"?: {
      source_url: string;
      alt_text: string;
    }[];

    author?: {
      name: string;
    }[];

    "wp:term"?: {
      id: number;
      name: string;
      slug: string;
      taxonomy: string;
    }[][];
  };
}

export interface PaginatedPosts {
  posts: WordPressPost[];
  totalPages: number;
}