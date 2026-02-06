import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { toast } from "react-toastify";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
   const [loading, setLoading] = useState(false);

  // Fetch the existing post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        const post = res.data;

        setTitle(post.title);
        setSubtitle(post.subtitle || "");
        setContent(post.content);

        // Show image preview
        setExistingImage(
          post.imageUrl?.startsWith("http")
            ? post.imageUrl
            : `http://localhost:4000/${post.imageUrl}`
        );
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load post");
      }
    };

    fetchPost();
  }, [id]);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("content", content);

    if (image) formData.append("image", image);

    await API.put(`/posts/${id}`, formData);

      toast.success("Post updated successfully!");

      setTimeout(() => {
        navigate(`/post/${id}`);
      }, 1200)

  } catch (error) {
    console.log(error.response?.data);
    toast.error(error.response?.data?.message || "Failed to update post");
  }
}

  return (
      <div className="form-container">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="6"
          required
        />

        {existingImage && (
          <div>
            <p>Current image:</p>
            <img src={existingImage} alt="Current" width="200" />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

         <button type="submit" disabled={loading}>
  {loading ? "Updating..." : "Update Post"}
</button>
      </form>
    </div>
  );
}

export default EditPost;
