import { useState, useEffect } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Home() {
 
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let currentUserId = null;

  if (token) {
    const decoded = jwtDecode(token);
    currentUserId = decoded.id; 
  }
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts");
        setPosts(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch posts")
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;

    try {
      await API.delete(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (error) {
      toast.error("Failed to delete post")
    }
  };

return (
  <div className="home-container">
    <h2>All Blog Posts</h2>

    {posts.length === 0 ? (
      <div className="empty-state">
        <h3>No posts yet ✍🏽</h3>
        <p>Be the first to share your thoughts with the community.</p>
        <Link to="/create" className="btn-primary">
          Create your first post
        </Link>
      </div>
    ) : (
      <div className="posts-grid">
        {posts.map((post) => (
          <div className="post-card" key={post._id}>
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="post-card-image"
              />
            )}

            <div className="post-card-content">
              <h3>{post.title}</h3>
              {post.subtitle && <h4>{post.subtitle}</h4>}
              <p>{post.content?.substring(0, 150) || ""}...</p>
              <p>
                <strong>Author:</strong> {post.author?.username || "Unknown"}
              </p>

              <div className="card-actions">
                <Link to={`/post/${post._id}`} className="read-more">
                  Read more →
                </Link>

              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
}
export default Home
