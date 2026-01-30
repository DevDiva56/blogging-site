import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../api";
import { jwtDecode } from "jwt-decode"


function ViewPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  const token = localStorage.getItem("token");
  let currentUserId = null;

  if (token) {
    const decoded = jwtDecode(token);
    currentUserId = decoded.id;
  }

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
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await API.delete(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete post");
    }
  };

  if (!post) return <p>Loading post...</p>;

  const isAuthor = currentUserId === post.author?._id;

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      {post.subtitle && <h4>{post.subtitle}</h4>}

      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="post-detail-image"
        />
      )}

      <p>{post.content}</p>

      <p>
        <strong>Author:</strong> {post.author?.username || "Unknown"}
      </p>

      <div className="card-actions">
        {/* Like & Comment visible to everyone */}
        <button className="btn-like">❤️ Like</button>
        <button className="btn-comment">💬 Comment</button>

        {/* Edit & Delete only for owner */}
        {isAuthor && (
          <>
            <button
              className="btn-edit"
              onClick={() => navigate(`/edit/${post._id}`)}
            >
              Edit
            </button>

            <button className="btn-delete" onClick={handleDelete}>
              Delete
            </button>
          </>
        )}
      </div>

      <Link to="/" className="back-link">
        ← Back to Home
      </Link>
    </div>
  );
}

export default ViewPost;
