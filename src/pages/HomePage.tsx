import { useEffect, useState } from "react";
import SiteHeader from "../components/SiteHeader";
import PostList from "../components/PostList";
import type { WordPressPost } from "../types/post";
import "../App.css";

import {
	getPaginatedPosts,
	getCategories,
} from "../lib/wordpress";


import type { WordPressCategory } from "../types/category";

function App() {
	const [posts, setPosts] = useState<WordPressPost[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [categories, setCategories] = useState<WordPressCategory[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
	async function loadPosts() {
		setLoading(true);
		setError(null);

		try {
			const result = await getPaginatedPosts(
			currentPage,
			6,
			selectedCategory
			);

			setPosts(result.posts);
			setTotalPages(result.totalPages);
		} catch (err) {
			setError(
			err instanceof Error
				? err.message
				: "Something went wrong."
			);
		} finally {
			setLoading(false);
		}
	}

	loadPosts();
	}, [currentPage, selectedCategory]);


	useEffect(() => {
	async function loadCategories() {
		try {
			const result = await getCategories();
			setCategories(result);
		} catch (err) {
			console.error("Failed to load categories:", err);
		}
	}
  	loadCategories();
	}, []);


	return (
	<main className="site-container">
		<SiteHeader />
		<section aria-labelledby="latest-heading">
		<h1 id="latest-heading">Latest articles</h1>
		<div className="category-filter">
		<button
			className={selectedCategory === undefined ? "active" : ""}
			onClick={() => {
			setSelectedCategory(undefined);
			setCurrentPage(1);
			}}
		>
			All
		</button>

		{categories.map((category) => (
			<button
			key={category.id}
			className={
				selectedCategory === category.id ? "active" : ""
			}
			onClick={() => {
				setSelectedCategory(category.id);
				setCurrentPage(1);
			}}
			>
			{category.name}
			</button>
		))}
		</div>

		{loading && <p>Loading articles...</p>}

		{error && <p role="alert">{error}</p>}

		{!loading && !error && posts.length === 0 && (
			<p>No articles have been published yet.</p>
		)}

		{!loading && !error && posts.length > 0 && (
			<PostList posts={posts} />
		)}

      	{!loading && !error && totalPages > 1 && (
			<nav className="pagination" aria-label="Article pagination">
				<button
				disabled={currentPage === 1}
				onClick={() => setCurrentPage((page) => page - 1)}
				>
				Previous
				</button>

				<span>
				Page {currentPage} of {totalPages}
				</span>

				<button
				disabled={currentPage === totalPages}
				onClick={() => setCurrentPage((page) => page + 1)}
				>
				Next
				</button>
			</nav>
		)}
    	</section>
  	</main>
);
}

export default App;