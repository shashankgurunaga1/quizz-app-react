import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate  } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { login } from "../actions/auth";




const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [passwrd, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();
  const[html_element,setElement]=useState();
  const [showDelayedText, setShowDelayedText] =useState(false);

  

  const onChangeUsername = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const passwrd = e.target.value;
    setPassword(passwrd);
  };

  setTimeout(() => {
    setShowDelayedText(true);
}, 2000);

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
        
        dispatch(login(email, passwrd))
          .then(() => {

        navigate("/profile");
       
        window.location.reload();
        
          })
          .catch(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    };
  
    if (isLoggedIn) {
      return <Navigate to="/profile" />;
    }


    
  return (

   
    <div className="container min-h-screen min-w-screen bg-red-300">
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="email">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={email}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="passwrd">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={passwrd}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
    </div>
    
  );
};

export default Login;