import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subtitle", subtitle);
      formData.append("content", content);

      if (image) {
        formData.append("image", image); 
      }

      const token = localStorage.getItem("token");

      await API.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });

      alert("Post created successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to create post");
    }
  };

  return (
      <div className="form-container">
      <h2>Create New Post</h2>
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
          required
        />

        <div className="image-field">
  <label>Post Image</label>
  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
  />

  {preview && (
    <img
      src={preview}
      alt="Preview"
      className="image-preview"
    />
  )}
</div>


        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
