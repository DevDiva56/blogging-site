import {useState} from "react"
import { login } from "../services/authService"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


function Login() {

    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit =async(e)=>{
        e.preventDefault()
        try{
            const res = await API.post ("/auth/login", {email,password})
            const token =res.data.token
            localStorage.setItem("token", token)
             toast.success("Login successful!")
      navigate("/")
        }
        catch (error) {
      toast.error(error.response?.data?.message || "Login failed")
    }
    }
  return (
    <div className="form-container">
      <h2>Login</h2>

       <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />
          <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>

    </div>
  );
}

export default Login