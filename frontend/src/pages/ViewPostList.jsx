import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import { toast } from "react-toastify";

function ViewPostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts"); // fetch all posts
        setPosts(res.data);
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to fetch posts");
      }
    };
    fetchPosts();
  }, []);

  if (!posts.length) return <p>No posts available.</p>;

  return (
    <div className="home-container">
      <h2>Explore</h2>
      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            {post.imageUrl && (
              <img src={post.imageUrl} alt={post.title} className="post-card-image" />
            )}
            <div className="post-card-content">
              <h3>{post.title}</h3>
              {post.subtitle && <h4>{post.subtitle}</h4>}
              <p>{post.content.slice(0, 100)}...</p>
              <Link to={`/post/${post._id}`}>Read More</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewPostsList;
