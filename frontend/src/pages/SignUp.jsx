import { useState } from "react"
import { signup } from "../services/authService";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


function Signup() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    // e.preventDefault();

    console.log("SIGNUP SUBMITTED");

    try {
      await API.post("/auth/signup", {
        username,
        email,
        password,
      });

      toast.success("Signup successful. Please login.")
      navigate("/login")
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Signup failed"
      )
    }
  }

  
  return (
    <div className="form-container">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      {/* 👇 THIS IS THE KEY */}
      <button type="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

//   // return (
//       // <div className="form-container">
//       // <h2>Hello, Ready to Experience Archie</h2>

//       {/* <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <br /><br />

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <br /><br />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <br /><br />

//         <button type="submit">Signup</button>
//       </form>
//     </div> */}


// //   );
// // }

export default Signup;
