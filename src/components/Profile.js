import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { jwtDecode } from 'jwt-decode';


const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  console.log("inside profile page currentUser         ", currentUser);
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>User Profile</strong> 
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser}
      </p>
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
  );
};

export default Profile;
