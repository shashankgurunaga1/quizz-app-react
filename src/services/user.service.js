import axios from "axios"
import authHeader from "./auth-header"


const API_URL="http://localhost:8080/api/v1/auth/";

const API_URL1="http://localhost:8080/api/v1/";

const getPublicContent=()=>{
  //do not need any authntication as auth folder is whitelisted in spring 
     return axios.get(API_URL+"demo-controller");
};

const getUserBoard = () => {
    // return axios.get(API_URL + "user", { headers: authHeader() });
    console.log(" inside user.service.js getUserboard");
    return axios.get(API_URL1+"user-controller",{headers:authHeader()});

   };
   

   
   const getAdminBoard = () => {
    return axios.get(API_URL1 + "admin-controller", { headers: authHeader() });
   };
   
   export default {
     getPublicContent,
     getUserBoard,
     getAdminBoard,
   };




