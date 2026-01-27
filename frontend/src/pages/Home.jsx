import {useState, useEffect} from "react"
import API from "../api"
import {Link} from "react-router-dom"

function Home() {

    const[posts, setPosts] =useState("")

    useEffect(()=>{
        const  fetchPosts = async ()=>{
            try{
                const res = await API.get("/posts")
                setPosts(res.data)
            }
            catch (error) {
        alert(error.response?.data?.message || "Failed to fetch posts");
      }
        }
         fetchPosts();
    }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto" }}>
      <h2>All Blog Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
       posts.map((post) => (
          <div key={post._id} style={{ border: "1px solid #ccc", margin: "20px 0", padding: "15px" }}>
            <h3>{post.title}</h3>
            {post.subtitle && <h4>{post.subtitle}</h4>}
            <p>{post.content.substring(0, 150)}...</p>
            <p><strong>Author:</strong> {post.author?.username || "Unknown"}</p>
            <Link to={`/post/${post._id}`}>Read more</Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Home