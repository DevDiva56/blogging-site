import { useState } from "react"
import API from "../api"
import { useNavigate } from "react-router-dom"



function CreatePost() {
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [content, setContent] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const navigate = useNavigate()

     const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    if (!token) {
      alert("You must be logged in to create a post");
      navigate("/login");
      return;
    }

     try {
      const res = await API.post(
        "/posts",
        { title, subtitle, content, imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      alert("Post created successfully!")
      navigate("/")
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create post")
    }
  }

  return (
    <div div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h2>Create New Post</h2>
       <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="text"
          placeholder="Subtitle (optional)"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
        <br /><br />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={6}
          style={{ width: "100%" }}
        />
        <br /><br />

        <input
          type="text"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <br /><br />

        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
