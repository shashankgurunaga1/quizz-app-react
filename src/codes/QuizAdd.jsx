import React from "react";
import authHeader from "../services/auth-header"
import { useState, useEffect,useRef } from "react";
import {
  Button,
  EditableText,
  Toaster,
  Position,
  InputGroup,
} from "@blueprintjs/core";
import { vInputValidation,required,validEmail } from "../actions/userValidation";


const AppToaster = Toaster.create({
  position: Position.TOP,
});
function QuizAdd() {
  const [Users, setUsers] = useState([]);
  const [NewFirstName, setFirstName] = useState("");
  const [NewLastName, setLastName] = useState("");
  const [NewEmail, setEmail] = useState("");
  const [NewPassword, setPassword] = useState("");

  const[NewRole,setNewRole] = useState();
  const[NewPhoneNumber, setPhoneNumber]=useState();

  const [role,setRole]= useState("USER");

  const currentUser = localStorage.getItem('user');
  const token='Bearer'+currentUser;
 
    const [error, setError] = useState('');
    const inputRef = useRef(null);

   

  console.log( "token value in quizadd js ", token);

  useEffect(() => {
    fetch("http://localhost:8080/quiz/getuserinfo",{
      method: "GET",
      headers: {
      Authorization: token,
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json())
      .then((json) => setUsers(json));
  }, []);


  const handleRoleChange = (e) => {
    console.log("new role ", e.target.value);
    setNewRole(e.target.value);
  };
  const adduser = () => {

    let first_name ;
    let last_name;
    let email;
    let role;
    let phone_no;
    let passwrd ;
    if(NewFirstName)
       {first_name=NewFirstName.trim();}
 
     if (NewLastName) {last_name = NewLastName.trim();}
     

    if(NewEmail){email=NewEmail.trim();}
   
    if (NewRole) {role=NewRole.trim();}
    if (NewPhoneNumber){ phone_no=NewPhoneNumber.trim();}
    if(NewPassword) { passwrd = NewPassword.trim();}
    if (first_name && last_name && email && role && passwrd && phone_no) {
      // dispatch(register(role,first_name,last_name, email, passwrd))
      fetch("http://localhost:8080/quiz/adduser",  {
        method: "POST",
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          role,
          passwrd,
          phone_no
        }),
        headers: {
          "Authorization":token,
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUsers([...Users, data]);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setPhoneNumber();
    
          AppToaster.show({
            message: "User added successfully",
            intent: "success",
            timeout: 3000,
          });
        });
    }
    else{
      setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setPhoneNumber();
      AppToaster.show({
        message: "All fields need to be filled up",
        intent: "failure",
        timeout: 3000,
      });

    }
  };

  const updateUser = (id) => {
    var user = Users.find((user) => user.id === id);
    console.log(" inside quizadd user:: ",user);

    let user_firstname = user.first_name;
    let user_lastname = user.last_name;
    let user_id = user.id;
    let user_email = user.email; 
    let user_phone_no = user.phone_no;
    let user_role=user.role;
    let jsonText2 = {};
    jsonText2.email = user_email;
    jsonText2.first_name = user_firstname;
    jsonText2.last_name = user_lastname;
    jsonText2.phone_no=user_phone_no;
    jsonText2.role=user_role;
    jsonText2.id = user_id;

    console.log(" inside quizadd user: jsonText2 : ", jsonText2);
   // let jsonText1 = '{"id":36,"email":"e@dd.com","first_name":"ddwsdws_new","last_name":"dsds"}'
   // const jsonobj = JSON.parse(jsonText1);
   // console.log(" inside quizadd user: before: ", jsonobj);
    //delete user.authorities[-1];jsonText = 
    console.log(" Quizadd printing id", id);
    fetch(`http://localhost:8080/quiz/updateuserinfo/${id}`, {
      method: "PUT",
      body: JSON.stringify(jsonText2),
      headers: {
        "Authorization":token,
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then(() => {
        AppToaster.show({
          message: "User updated successfully",
          intent: "success",
          timeout: 5000,
        });
      });
  };



  const deleteUser = (id) => {
    fetch(`http://localhost:8080/quiz/deleteuserinfo/${id}`,{
      method:"DELETE",
      headers:{
               "Authorization":token,
               "Content-type":"application/json",
               "Access-Control-Allow-Origin" : "*", 
               "Access-Control-Allow-Credentials" : true 
      }
    })
    .then(() => {
      setUsers(values => {
        return values.filter(item => item.id !== id)

      })


      AppToaster.show({
        message: "User deleted successfully",
        intent: "success",
        timeout: 3000,
      })
    })

  
  }

  const OnChangeHandler = (id, key, value) => {
    setUsers((values) => {
      return values.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      );
    });
  };

  return (
    <div className="Quiz-app">
      <table>
        <thead>
          <tr>
            <th>user_id</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Phone No</th>
          </tr>
        </thead>
        <tbody>
          {Users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td> <EditableText
                  value={user.email}
                  onChange={(value) =>
                    OnChangeHandler(user.id, "email", value)
                  }
                  />
                  </td>
              <td>
                <EditableText
                  value={user.first_name}
                  onChange={(value) =>
                    OnChangeHandler(user.id, "first_name", value)
                  }
                />
              </td>
              <td>
                <EditableText
                  value={user.last_name}
                  onChange={(value) =>
                    OnChangeHandler(user.id, "last_name", value)
                  }
                />
              </td>
             
             
              <td>
                <EditableText 
                  value={user.role}
                  onChange={(value) =>
                    OnChangeHandler(user.id, "role", value)
                  }
                />
              </td>
              <td>
                <EditableText value={user.phone_no}
                 onChange={(value) =>
                  OnChangeHandler(user.id, "phone_no", value)
                } />
              </td>
              <td>
                <Button  className="btn btn-primary btn-block" onClick={() => updateUser(user.id)}>
                  Update
                </Button>
                &nbsp;
                <Button className="btn btn-warning btn-block" onClick={() => deleteUser(user.id)}>
                  Delete
                </Button>
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
        
          <tr>
            <td></td>
            <td>
              <InputGroup 

                value={NewFirstName}
                validations={[required,vInputValidation]}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Add first name..."
                
              />

            </td>
            <td>
              <InputGroup
                value={NewLastName}
                validations={[required,vInputValidation]}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Add last name..."

              />
            </td>
            <td>
              <InputGroup
                value={NewEmail}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Add Email..."
                required

              />
            </td>
            <td>
            <InputGroup
                value={NewPassword}
                validations={[required]}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Add Password..."

              />
            </td>
            <td>
             

                <select id="role" name="role"  onChange= {handleRoleChange}>
                <option value="" selected disabled hidden>Choose here</option>
                <option  value="USER">User</option>
                <option value="ADMIN">Admin</option>
                

              </select>
            </td>
            <td>
            <InputGroup
                value={NewPhoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Add Phone number..."
              />
            </td>
           
          </tr>
          <tr>
            <td></td>
          <td>
              <Button className="btn btn-info btn-block" onClick={adduser}>
                Add user
              </Button>
            </td>
          </tr>
        
        </tfoot>
      </table>
    
    </div>
  );
}

export default QuizAdd;
