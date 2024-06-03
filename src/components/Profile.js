import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { jwtDecode } from 'jwt-decode';
import  { useState } from "react";
import "core-js/stable/atob";
import { decode } from "base-64";
global.atob = decode;

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  console.log("inside profile page currentUser         ", currentUser);
 // const secret = '4D92199549E0F2EF009B4160F3582E5528A11A45017F3EF8'; 



  
  if (!currentUser) {
    
    return <Navigate to="/login" />;
  }
 

  return (
    <>
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>
            <font color="blue">
              User Profile </font>
              </strong>
        </h3>
      </header>
      <br>
      </br>
      <br></br>
      <p>
        <strong>first Name:</strong> {jwtDecode(currentUser.toString()).first_name}
      </p>
      <p>
        <strong>Last Name:</strong> {jwtDecode(currentUser.toString()).last_name}
      </p>
      <p>
        <strong>Email:</strong> {jwtDecode(currentUser.toString()).sub}
      </p>
      <strong>Role:</strong>{jwtDecode(currentUser.toString()).role}
     
    </div>
    
   
    </>
  );
};

export default Profile;
