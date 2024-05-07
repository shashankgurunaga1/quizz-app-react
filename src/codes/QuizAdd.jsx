import React from "react";
import authHeader from "../services/auth-header"
import { useState, useEffect } from "react";
import {
  Button,
  EditableText,
  Toaster,
  Position,
  InputGroup,
} from "@blueprintjs/core";

const AppToaster = Toaster.create({
  position: Position.TOP,
});
function QuizAdd() {
  const [Users, setUsers] = useState([]);
  const [NewFirstName, setFirstName] = useState("");
  const [NewLastName, setLastName] = useState("");
  const [NewEmail, setEmail] = useState("");
  const[NewRole,setNewRole] = useState();
  const[NewPhoneNumber, setPhoneNumber]=useState();

  const [role,setRole]= useState("USER");

  const currentUser = localStorage.getItem('user');
  const token='Bearer'+currentUser;

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


  const adduser = () => {
    const first_name = NewFirstName.trim();
    const last_name = NewLastName.trim();
    const email=NewEmail.trim();
    const role=NewRole.trim();
    const phone_no=NewPhoneNumber.trim();
    if (first_name && last_name) {
      fetch("http://localhost:8080/quiz/adduser",  {
        method: "POST",
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          role,
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
    
          AppToaster.show({
            message: "User added successfully",
            intent: "success",
            timeout: 3000,
          });
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
                <Button intent="primary" onClick={() => updateUser(user.id)}>
                  Update
                </Button>
                &nbsp;
                <Button intent="danger" onClick={() => deleteUser(user.id)}>
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
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Add first name here..."

              />
            </td>
            <td>
              <InputGroup
                value={NewLastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Add last name here..."

              />
            </td>
            <td>
              <InputGroup
                value={NewEmail}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Add Email here..."

              />
            </td>
            <td>
             

                <select id="role" name="role" value={role} onChange={(e)=> setNewRole(e.target.value)}>
                
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>

              </select>
            </td>
            <td>
            <InputGroup
                value={NewPhoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Add Phone number here..."
              />
            </td>
            <td>
              <Button intent="success" onClick={adduser}>
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
