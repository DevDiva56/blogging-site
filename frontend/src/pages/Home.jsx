import { useState, useEffect } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"


function Home() {
 
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let currentUserId = null;

  if (token) {
    const decoded = jwtDecode(token);
    currentUserId = decoded.id; // must match backend payload
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts");
        setPosts(res.data);
      } catch (error) {
        alert(error.response?.data?.message || "Failed to fetch posts");
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
      alert("Failed to delete post");
    }
  };

  return (
    <div className="home-container">
      <h2>All Blog Posts</h2>

      <div className="posts-grid">
        {posts.map((post) => {
          const isAuthor = currentUserId === post.author?._id;

          return (
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
                <p>{post.content.substring(0, 150)}...</p>

                <p>
                  <strong>Author:</strong> {post.author?.username || "Unknown"}
                </p>

                <div className="card-actions">
                  {/* Only "Read more" link for now */}
                  <Link to={`/post/${post._id}`} className="read-more">
                    Read more →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Home;
