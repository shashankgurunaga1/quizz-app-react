import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { register } from "../actions/auth";

export const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};



export const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
    }
  };
  
export const vfirstname = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The username must be between 3 and 20 characters.
        </div>
      );
    }
  };


export  const vlastname = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The username must be between 3 and 20 characters.
        </div>
      );
    }
  };


  const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
  };
  
  const Register = () => {
    const form = useRef();
    const checkBtn = useRef();
  
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [passwrd, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [role,setRole]= useState("USER");
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

  
    const onChangeFirstName = (e) => {
      const first_name = e.target.value;
      setFirstName(first_name);
    };


    const onChangeLastName =(e)=>{
        const last_name=e.target.value;
        setLastName(last_name);
    }

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
      };
    
      const onChangePassword = (e) => {
        const passwrd = e.target.value;
        setPassword(passwrd);
      };
    
      const handleRegister = (e) => {
        e.preventDefault();
    
        setSuccessful(false);
    
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
          console.log("inside register js printing role", role);
         // localStorage.setItem('role', role);

            dispatch(register(role,first_name,last_name, email, passwrd))
              .then(() => {
                setSuccessful(true);
              })
              .catch(() => {
                setSuccessful(false);
              });
          }
        };
        return (
            <div className="col-md-12">
              <div className="card card-container">
               
        
                <Form onSubmit={handleRegister} ref={form}>
                  {!successful && (
                    <div>
                      <div className="form-group">
                        <label htmlFor="first_name">First Name</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="firstname"
                          value={first_name}
                          onChange={onChangeFirstName}
                          validations={[required, vfirstname]}
                        />
                      </div>


                      
                      <div className="form-group">
                        <label htmlFor="last_name">Last Name</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="lastname"
                          value={last_name}
                          onChange={onChangeLastName}
                          validations={[required, vlastname]}
                        />
                      </div>


                      <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={passwrd}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
              <label htmlFor="role">Choose a role &nbsp;</label>
              <select id="role" name="role" value={role} onChange={(e)=> setRole(e.target.value)}>
                
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>

              </select>
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

      {successful && (
        <div className="form-group">
        <p> Registration is successful</p>
        </div>
      )
    }
          {message && (
            <div className="form-group">
              <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};


export default Register;
/*
{
  Register,
  validEmail,
  required,
  vfirstname,
  vlastname
}*/
