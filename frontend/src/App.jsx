import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import ViewPost from "./pages/ViewPost.jsx";
import ViewPostsList from "./pages/ViewPostList.jsx";
import EditPost from "./pages/EditPost.jsx";

import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App(){

  return (
      <BrowserRouter>
     <div className="app-container">
        <NavBar />
      <div className="main-content">
        <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
          <Route
    path="/"
    element={
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    }
  />
       
        <Route path="/signup" element={<SignUp />} />
        <Route path ="/login"element ={<Login/>}/>
        <Route path ="/create"element ={<CreatePost/>}/>
        <Route path="/view" element={<ViewPostsList />} />   
        <Route path="/post/:id" element={<ViewPost />} /> 
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
      </div>
    </div>
    </BrowserRouter>
  )
}

export default App







