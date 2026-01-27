import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../api"


function ViewPost() {

  const { id } = useParams()
  const [post, setPost] = useState(null)
   useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setPost(res.data)
      } catch (error) {
        alert(error.response?.data?.message || "Failed to fetch post")
      }
    }
      fetchPost()
}, [id])

 if (!post) return <p>Loading post...</p>

  return (
    <div style={{ maxWidth: "700px", margin: "50px auto" }}>
      <h2>{post.title}</h2>
      {post.subtitle && <h4>{post.subtitle}</h4>}
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
        />
      )}

      <p style={{ marginTop: "20px" }}>{post.content}</p>
      <p><strong>Author:</strong> {post.author?.username || "Unknown"}</p>
    </div>
  );
}

export default ViewPost;