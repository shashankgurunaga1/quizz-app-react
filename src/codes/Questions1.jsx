import React from 'react';
import axios from 'axios';
import {useState,useEffect} from "react";
import authHeader from "../services/auth-header"
import { EditableText } from '@blueprintjs/core';
import { json } from 'react-router-dom';





function Questions1(){
    const [questionArray,setQuestionArray]=useState([]);
    const [error, setError] = useState(null);
    const OnChangeHandler = (id, key, value) => {
        setQuestionArray((values) => {
          return values.map((item) =>
            item.id === id ? { ...item, [key]: value } : item
          );
        });
      };

       useEffect(()=>{
          //  const res=axios.get(`http://localhost:8080/questions/getting_questions`,{headers:authHeader()})
          fetch("http://localhost:8080/questions/getting_questions",{
            method: "GET",
            headers: {
           
            "Content-type": "application/json; charset=UTF-8",
          },
        })
            .then(
                response=> response.json()
                )
                
            .then((data)=>{
                console.log("data from question js ", data);
              
            }
            )
            .catch(error => setError(error));
            
        
    
       },
       []
       );

       if (error) {
        return <div>
            An error occurred:
            {error.message}
        </div>;
    } else if (!questionArray) {
        return <div>Loading...</div>
    } else {
        return (
        <>
        <div className="quiz">
            
            MyTable: <br/>
            {
            questionArray.map((question) => (
            <table border="2">
        
            <thead>
            <th>Question_id</th>
            <th>Question_text</th>
               <th>Marks</th>
               <th>Quiz_ID</th>
               <th>Answer</th>
            </thead>
            <tbody >  
                <tr key={question.question_id}>
                <td>{question.question_id}</td>
                <td><EditableText value={question.question_text}  onChange={(value)=>OnChangeHandler(question.question_id,"question_text",value)}/></td>
                        <td><EditableText value={question.marks}  onChange={(value)=>OnChangeHandler(question.question_id,"marks",value)}/></td>
                        <td><EditableText value={question.quiz_id}  onChange={(value)=>OnChangeHandler(question.question_id,"quiz_id",value)}/></td>
                        <td><EditableText value={question.answer}   onChange={(value)=>OnChangeHandler(question.question_id,"answer",value)}/></td>
                </tr>
                </tbody>
            </table>
            ))
            }



        </div>
        </>
        )
    }




 
   
}

export default Questions1;