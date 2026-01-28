import { Link, useNavigate, useLocation } from "react-router-dom"

function NavBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const token = localStorage.getItem("token")

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  };

  const isActive = (path) =>
    location.pathname === path ? "active" : "";

  return (
    <div className="sidebar">
      <h2>Archie</h2>

      <Link to="/" className={isActive("/")}>Home</Link>

      {token && (
        <Link to="/create" className={isActive("/create")}>
          Create Post
        </Link>
      )}

       <Link to="/view" className={isActive("/view")}>
          View Post
        </Link>

      {!token ? (
        <>
          <Link to="/login" className={isActive("/login")}>Login</Link>
          <Link to="/signup" className={isActive("/signup")}>Signup</Link>
        </>
      ) : (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  )
}

export default NavBar
