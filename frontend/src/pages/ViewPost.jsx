import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { Link } from "react-router-dom";

function ViewPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setPost(res.data);
      } catch (error) {
        alert(error.response?.data?.message || "Failed to fetch post");
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await API.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete post");
    }
  };

  if (!post) return <p>Loading post...</p>;

  return (
    <div className="post-detail post-card">
      {post.imageUrl && (
        <img className="post-card-image" src={post.imageUrl} alt={post.title} />
      )}

      <div className="post-card-content">
        <h2>{post.title}</h2>
        {post.subtitle && <h4>{post.subtitle}</h4>}
        <p>{post.content}</p>
        <p><strong>Author:</strong> {post.author?.username || "Unknown"}</p>

        <div style={{ display: "flex", gap: "10px" }}>
          <Link to={`/edit/${post._id}`}>Edit</Link>
          <button onClick={handleDelete}>Delete Post</button>
        </div>
      </div>
    </div>
  );
}

export default ViewPost;
