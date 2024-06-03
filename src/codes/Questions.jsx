import React from 'react';
import axios from 'axios';
import {useState,useEffect} from "react";
import { REST_URL } from '../actions/constant';
import authHeader from "../services/auth-header"
//import { Button,EditableText,Position,InputGroup } from '@blueprintjs/core';
import { json } from 'react-router-dom';
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


function Questions(){
    const [questionArray,setQuestionArray]=useState([]);
    const [QuestionText,setQuestionText]=useState("");
    const [Marks,setMarks]=useState();
    const [QuizId,setQuizId]=useState();
    const [Answer,setAnswer]=useState("");
    const [error, setError] = useState(null);
    const[missing,setMissing]=useState(false);
    const[Option1, setOption1]=useState("");
    const[Option2, setOption2]=useState("");
    const[Option3, setOption3]=useState("");


    const GET_API_URL = REST_URL+"questions/getting_questions";
    const POST_API_URL = REST_URL+"questions/create_question";
    const UPDATE_API_URL = REST_URL+"questions/update_questions/${question_id}";
    const DELETE_API_URL=REST_URL+"questions/delete_questions/";
    //http://localhost:8080/questions/delete_questions/${id}

    useEffect(()=>{
          //  const res=axios.get(`http://localhost:8080/questions/getting_questions`,{headers:authHeader()})
          fetch(GET_API_URL,{
            method: "GET",
            headers: {
           
            "Content-type": "application/json; charset=UTF-8",
          },
        })
            .then(
                response=> response.json()
                )
                
            .then((data)=>{
                console.log("data from question js ", data)
                setQuestionArray( data);

            }
            )
            .catch(error => setError(error));
            
        
    
       },
       []
       );

      
    




 
   



const addQuestions=()=>{
    
      let question_text;
      if(QuestionText){question_text=QuestionText.trim();  }   
      let marks;
      if(Marks) {marks=Marks;  }  
      let answer=Answer.trim();
      let quiz_id=QuizId;
      let option1= Option1.trim();
      let option2= Option2.trim();
      let option3= Option3.trim();

       console.log("Question Text"+question_text);
       console.log("Marks"+marks);
       console.log("Quiz Id"+quiz_id);
       console.log("Answer "+answer);
       console.log("Option1 "+option1);
       console.log("Option1 "+option2);
       console.log("Option1 "+option3);



      if(question_text && answer && quiz_id && marks){
            fetch(POST_API_URL,{
                method: "POST",
                body:JSON.stringify({
                    question_text,
                    marks,
                    quiz_id,
                    answer,
                    option1,
                    option2,
                    option3
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            }).then((response) =>response.json())
            .then((data)=>{
                console.log("Data is ",data);
                setQuestionArray([...questionArray,data]);
                setQuestionText("");
                setMarks();
                setQuizId();
                setAnswer("");
                setOption1("");
                setOption2("");
                setOption3("");


        
      });
            }

          

            }

const updateQuestions=(question_id)=>{
      var question= questionArray.find((question)=>question.question_id===question_id);
      console.log("Inside the questions update function");
      let question_question_text=question.question_text;
      let question_marks=question.marks;
      let question_quiz_id=question.quiz_id;
      let question_answer=question.answer;
      let question_option1 = question.option1;
      let question_option2 = question.option2;
      let question_option3 = question.option3;



      let json_question_dict={}
      json_question_dict.question_id=question_id;
      json_question_dict.question_text=question_question_text;
      json_question_dict.marks=question_marks;
      json_question_dict.quiz_id=question_quiz_id;
      json_question_dict.answer=question_answer;
      json_question_dict.option1=question_option1;
      json_question_dict.option2=question_option2;
      json_question_dict.option3=question_option3;

      console.log("The json dictionary output is",json_question_dict);
      console.log("question id ",question_id);
      fetch(`http://localhost:8080/questions/update_questions/${question_id}`, {
        method: "PUT",
        body: JSON.stringify(json_question_dict),
        headers: {
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


const deleteQuestions=(id)=>{
 //let DELETE_API_URL1 =DELETE_API_URL+'${id}';
  fetch(`http://localhost:8080/questions/delete_questions/${id}`,{
    //fetch(`DELETE_API_URL1`,{
      method:"DELETE",
      headers:{
        "Content-type":"application/json"
      }

     })
     .then(()=>{setQuestionArray(values=>{
       return values.filter(item=>item.question_id!=id);
     })});
}
const OnChangeHandler = (question_id, key, value) => {
  setQuestionArray((values) => {
    return values.map((item) =>
      item.question_id === question_id ? { ...item, [key]: value } : item
    );
  });
};

return(
    <>
    <div>
      
   
            <table>
        
            <thead>
            <th>Question_id</th>
            <th>Question_text</th>
               <th>Marks</th>
               <th>Quiz_ID</th>
               <th>Option1</th>
               <th>Option2</th>
               <th>Option3</th>
               <th>Answer</th>
            </thead>
            <tbody>  
              {
            questionArray.map((question) => (
                <tr key={question.question_id}>
                <td>{question.question_id}</td>
                 <td> <EditableText
                  value={question.question_text}
                  onChange={(value) =>
                    OnChangeHandler(question.question_id, "question_text", value)
                  }
                  />
                  </td>
                        <td><EditableText value={question.marks}  onChange={(value)=>OnChangeHandler(question.question_id,"marks",value)}/></td>
                        <td><EditableText value={question.quiz_id}  onChange={(value)=>OnChangeHandler(question.question_id,"quiz_id",value)}/></td>
                        <td><EditableText value={question.option1}   onChange={(value)=>OnChangeHandler(question.question_id,"option1",value)}/></td>
                        <td><EditableText value={question.option2}   onChange={(value)=>OnChangeHandler(question.question_id,"option2",value)}/></td>
                        <td><EditableText value={question.option3}   onChange={(value)=>OnChangeHandler(question.question_id,"option3",value)}/></td>

                        <td><EditableText value={question.answer}   onChange={(value)=>OnChangeHandler(question.question_id,"answer",value)}/></td>
                        <td><Button  className="btn btn-primary btn-block" onClick={()=>updateQuestions(question.question_id)} >Update</Button></td>
                        <td><Button i className="btn btn-warning btn-block" onClick={()=>deleteQuestions(question.question_id)}>Delete</Button></td>
                </tr>
                ))
              }
                </tbody>
                <tfoot>
                <tr>
                   <td><InputGroup value={QuestionText}  onChange={(e) => setQuestionText(e.target.value)}  placeholder="Enter the question text"/> </td>
                    <td><InputGroup value={Marks} onChange={(e)=>setMarks(e.target.value)}   placeholder="Enter the marks allocated for each question"/></td>
                     <td><InputGroup  value={QuizId}  onChange={(e)=>setQuizId(e.target.value)}   placeholder="Enter the quiz id for the question"/></td>
                     <td><InputGroup  value={Answer}  onChange={(e)=>setAnswer(e.target.value)}   placeholder="Enter the actual answer for the question"/></td>
                </tr>
                <tr>
                    <td><InputGroup value={Option1} onChange={(e)=>setOption1(e.target.value)}   placeholder="Enter Answer- Option1"/></td>
                     <td><InputGroup  value={Option2}  onChange={(e)=>setOption2(e.target.value)}   placeholder="Enter Answer- Option2"/></td>
                     <td><InputGroup  value={Option3}  onChange={(e)=>setOption3(e.target.value)}   placeholder="Enter Anwer- Option3"/></td>
                </tr>
                <tr>
                  <td>
              <Button  className="btn btn-warning btn-block" onClick={addQuestions}>
               Insert New question
              </Button>
            </td>
                </tr>


               
                </tfoot>
            </table>
            
    </div>
    
    </>
);
}
export default Questions;