import { useState, useEffect } from "react";
import API from "../api";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);

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

  return (
    <div className="home-container">
      <h2>All Blog Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
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
                <p>{post.content.substring(0, 150)}...</p>
                <p><strong>Author:</strong> {post.author?.username || "Unknown"}</p>
                <div className="card-actions">
                    <button className="btn-edit">Edit</button>
                    <button className="btn-delete">Delete</button>
                <Link to={`/post/${post._id}`}>Read more</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
