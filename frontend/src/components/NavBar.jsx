import { Link, useNavigate } from "react-router-dom"

function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
//   const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkStyle = (path) => ({
    display: "block",
    color: location.pathname === path ? "#00d4ff" : "white",
    textDecoration: "none",
    margin: "15px 0",
    fontWeight: 500,
  });

  return (
    <div
      style={{
        width: "200px",
        height: "100vh",
        backgroundColor: "#1e1e2f", // dark sidebar
        padding: "20px",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <h2 style={{ color: "#00d4ff" }}>Archie</h2>
      <Link to="/" style={linkStyle("/")}>Home</Link>
      {token && <Link to="/create" style={linkStyle("/create")}>Create Post</Link>}
      {!token ? (
        <>
          <Link to="/login" style={linkStyle("/login")}>Login</Link>
          <Link to="/signup" style={linkStyle("/signup")}>Signup</Link>
        </>
      ) : (
        <button
          onClick={handleLogout}
          style={{
            marginTop: "20px",
            padding: "10px 15px",
            width: "100%",
            backgroundColor: "#00d4ff",
            color: "#1e1e2f",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      )}
    </div>
  )
}

export default NavBar