
import './App.css';
import QuizAdd from './codes/QuizAdd';
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Footer from "./Footer";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdmin";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { jwtDecode } from 'jwt-decode';
import Questions from './codes/Questions';
import QuestionPage, {QuestionPath} from './codes/QuestionPage';
import "core-js/stable/atob";
import { decode } from "base-64";
global.atob = decode;

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let location = useLocation();

  const [role,setRole] = useState("");

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    console.log("current user ",currentUser);
   
   
    

    if (currentUser) {

      console.log("inside app js currentUser value", currentUser);
      console.log("inside app js currentUser  email  value",jwtDecode(currentUser.toString()).sub);
      console.log("inside app js currentUser  rolw  value",jwtDecode(currentUser.toString()).role);

      localStorage.setItem('user',currentUser);
  

      //setRole(jwtDecode(currentUser.toString()).role)
    
      if(jwtDecode(currentUser.toString()).role =="ADMIN" )
      {
        setShowAdminBoard(true);

      }
    } else {
      setShowAdminBoard(false);
    }
  }, [currentUser]);

  return (
    <div>
    <div id="geeks">

      <nav className="navbar navbar-expand navbar-dark bg-primary text-secondary">
      
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

    

        

          {showAdminBoard && (
            <li className="nav-item">
            <Link to={"/questions"} className="nav-link">
                Questions Management
            </Link>
            </li>
          )}

{currentUser && (
            <li className="nav-item">
            <Link to={"/quiz"} className="nav-link">
                 Take  Quiz
            </Link>
            </li>
          )}

            {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/userManagement"} className="nav-link">
            User Management            
            </Link>
            </li>
            
          )}

         
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {
                jwtDecode(currentUser.toString()).sub
                }
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>


         
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/userManagement" element={<QuizAdd />} />
          <Route path="/questions" element={<Questions/>}/>
          <Route path="/quiz" element={<QuestionPage/>}/>

        </Routes>
      </div>

    </div>
    <Footer /> 

    </div>
  );
};

export default App;

