import{BrowserRouter as Router,Routes,Route} from "react-router-dom"
import NavBar from "./components/NavBar"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import CreatePost from "./pages/CreatePost"
import ViewPost from "./pages/ViewPost"
import EditPost from "./pages/EditPost"


function App(){

  return (

    <Router>
        <NavBar />
      <div className="main-content">
      <Routes>
        <Route path ="/"element ={<Home/>}/>
        <Route path="/signup" element={<Signup />} /> 
        <Route path ="/login"element ={<Login/>}/>
        <Route path ="/create"element ={<CreatePost/>}/>
        <Route path ="/post/:id"element ={<ViewPost/>}/>
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
      </div>
    </Router>
  )
}

export default App







