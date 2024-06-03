import axios from "axios"
import { REST_URL } from "../actions/constant";


const API_URL =REST_URL+ "api/v1/auth/";
console.log("API URL ", API_URL);
//const API_URL="http://localhost:8080/api/v1/auth/"
//temprorary setting role value 
//var role ="ADMIN"

const register=(role,first_name,last_name,email,passwrd)=>{
   // localStorage.getItem('role');


    console.log(" in auth serice js role", role);
    console.log(" in auth serice js first name", first_name);
    console.log(" in auth serice js password",passwrd);


return axios.post(API_URL+"register",{
      first_name,
      last_name,
      email,
      passwrd,
      role

});
};



const  login=async(email,passwrd)=>{

    return  await axios.post(API_URL+"authenticate",{
        email,
        passwrd
  }).then((response)=>{
    if(response.data.token){
        localStorage.setItem("user",JSON.stringify(response.data.token));
        response.data.accessToken = response.data.token;
    }   
    else{
        console.log("entering in the axios post request ", response.data)
    }
    console.log("access token for logged in user  response", response.data);

     console.log("access token for logged in user ", response.data.token);


      return response.data;
  })
  .catch(error => {console.log("error  ", error)})

  ;

 
};



const logout=()=>{
    sessionStorage.clear();
    localStorage.removeItem("user");

}


export default{
    register,
    login,
    logout,
}