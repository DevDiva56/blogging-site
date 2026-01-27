import{BrowserRouter as Router,Routes,Route} from "react-router-dom"
import NavBar from "./components/NavBar"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import CreatePost from "./pages/CreatePost"
import ViewPost from "./pages/ViewPost"


function App(){

  return (

    <Router>
        <NavBar />
      <div style={{ marginLeft: "220px", padding: "20px" }}></div>
      <Routes>
        <Route path ="/"element ={<Home/>}/>
        <Route path="/signup" element={<Signup />} /> 
        <Route path ="/login"element ={<Login/>}/>
        <Route path ="/create"element ={<CreatePost/>}/>
        <Route path ="/post/:id"element ={<ViewPost/>}/>
      </Routes>
    </Router>
  )
}

export default App







