import React from 'react'

import { useSelector } from "react-redux";


export default function authHeader(){
    //const user=JSON.parse(localStorage.getItem('user'))
   // const { user: currentUser } = useSelector((state) => state.auth);
var currentUser = localStorage.getItem('user');
   // var isAlreadyLoggedIn = sessionStorage.getItem("isAlreadyLoggedIn");
    console.log(" in authheader.js  token ", currentUser);
   // currentUser = currentUser.replace(/^\"/, "");
   // currentUser = currentUser.replace(/\"$/, "");
    //console.log(" in authheader.js  after token ", currentUser);
    if(currentUser){
       // var isMyUserLoggedIn = "false";
       // if(isAlreadyLoggedIn === "true" && sessionStorage.getItem("isMyUserLoggedIn")) {
        //    isMyUserLoggedIn = sessionStorage.getItem("isMyUserLoggedIn");
        //    return {Authorization:'isMyUserLoggedInStart'+isMyUserLoggedIn+'isMyUserLoggedInEnd' 
    //  + 'Bearer'+currentUser};
     //   }
     //   else {
            return {Authorization:'Bearer'+currentUser};
      //  }
    //if(user && user.accessToken){
      //  return {Authorization:'Bearer'+user.accessToken};
      //return {Authorization:'isMyUserLoggedInStart'+isMyUserLoggedIn+'isMyUserLoggedInEnd' 
      //+ 'Bearer'+currentUser};
    }


   //else{
      //  return {};
   // }
}