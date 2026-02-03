import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../api";
import {jwtDecode} from "jwt-decode";

function ViewPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  // Get token and user ID
  const token = localStorage.getItem("token");
  const currentUserId = token ? jwtDecode(token).id : null;

  // Helper for authenticated requests
  const authRequest = (config = {}) => {
    if (!token) return toast.info("No token found. Please login.");
    return { ...config, headers: { ...config.headers, Authorization: `Bearer ${token}` } };
  };

  // Fetch post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch post");
      }
    };
    fetchPost();
  }, [id]);

  // Sync likes & comments when post or user changes
  useEffect(() => {
    if (post) {
      setLikesCount(post.likes.length);
      setLiked(currentUserId ? post.likes.includes(currentUserId) : false);
      setComments(post.comments || []);
    }
  }, [post, currentUserId]);

  // Like / Unlike
  const handleLike = async () => {
    try {
      if (!token) return toast.info("Please login to like");
      const res = await API.post(`/posts/${id}/like`, {}, authRequest());
      setLiked(res.data.liked);
      setLikesCount(res.data.likesCount);
    } catch (err) {
      console.error(err);
       toast.error(err.response?.data?.message || "Failed to like post");
    }
  };

  // Submit comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const res = await API.post(`/posts/${id}/comment`, { text: commentText }, authRequest());
      setComments(res.data);
      setCommentText("");
    } catch (err) {
      console.error(err);
       toast.error(err.response?.data?.message || "Failed to add comment");
    }
  };

  // Delete post
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await API.delete(`/posts/${id}`, authRequest());
      navigate("/");
    } catch (err) {
      console.error(err);
       toast.error(err.response?.data?.message || "Failed to delete post");
    }
  };

  if (!post) return <p>Loading post...</p>;

  const isAuthor = currentUserId === post.author?._id;

  return (
  <div className="post-detail">
    <h2>{post.title}</h2>
    {post.subtitle && <h4>{post.subtitle}</h4>}

    {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}

    <p>{post.content}</p>

    <p>
      <strong>Author:</strong> {post.author?.username || "Unknown"}
    </p>

    <div className="post-actions">
      <button className="like-btn" onClick={handleLike}>
        {liked ? "💔 Unlike" : "❤️ Like"} ({likesCount})
      </button>

      {isAuthor && (
        <>
          <button className="edit-btn" onClick={() => navigate(`/edit/${post._id}`)}>Edit</button>
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>

    <div className="comment-section">
      <h3>Comments</h3>
      {comments.length === 0 ? (
        <p className="no-comments">No comments yet.</p>
      ) : (
        comments.map((comment, index) => (
          <div key={index} className="comment">
            <strong className="comment-user">{comment.user?.username || "Anonymous"}</strong>
            <p className="comment-text">{comment.text}</p>
          </div>
        ))
      )}

      {token && (
        <form className="comment-form" onSubmit={handleCommentSubmit}>
          <textarea
            className="comment-input"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            required
          />
          <button className="comment-btn" type="submit">Post Comment</button>
        </form>
      )}
    </div>

    <Link to="/" className="back-link">← Back to Home</Link>
    
  </div>
);

}
export default ViewPost
