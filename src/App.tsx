import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles/:slug" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;