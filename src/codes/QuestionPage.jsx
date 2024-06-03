
import React from "react";
import {useState,useEffect} from "react";
import { Button,Toaster,Position,EditableText,InputGroup} from "@blueprintjs/core";
import { REST_URL } from "../actions/constant";



  


const AppToaster=Toaster.create({
   position:Position.TOP,
});




const QuestionPage=()=>{
    const [questions_array,setQuestionsarray]=useState([]);
    const[answers,setAnswer]=useState("");
    const  [marks,setMarks]=useState(0);
    const [answers_array,setAnswerarray]=useState([]);
    const[html_element,setElement]=useState([]);
    const[button_element_disabled,setButtonDisabled]=useState(false);
    let totalMarks = 0;
    const API_URL =REST_URL+ "questions/getting_questions";
   
    let maphash =new Map();

    useEffect(()=>{
        fetch(API_URL,{
            method:"GET",
            headers:{
                "Content-Type": "application/json; charset=UTF-8",
            }
        }).then((response)=>response.json())
        .then(
            (data)=>{console.log("Data is",data);
            setQuestionsarray(data);
            setAnswerarray(data);
        console.log("inside question page  questionArray", questions_array.length)})
            ;
    },[]);

   



 const processMarks=()=>{
    console.log("Question array is",questions_array);
    console.log("Answer array is",answers_array);
    for (const [key, value] of maphash) {
      console.log(">>>>" + key + ' = ' + value);
    }
    answers_array.forEach((answer) => {
      // Compare ids and answers
      let user_answer=maphash.get(answer.question_id);
      let actual_answer= answer.answer;
      console.log(" user anser =", user_answer);
      console.log(" actual answer = ", actual_answer," marks=",answer.marks);
      if (user_answer === actual_answer ) {
        // Increment totalMarks
        totalMarks += answer.marks;
      }
    });
    console.log("The total marks is",totalMarks);
    setButtonDisabled(true);

    addMarksElement();
    
        
        
 }
 

 const addMarksElement=()=>{
    console.log("The total marks obtained is",totalMarks);
    setElement(html_element=>[...html_element,<div key={html_element.length}><h2>The marks obtained is {totalMarks}</h2></div>]);
 }

 const printValue=(value1,value2)=>{
  console.log("The question id value",value1);
  console.log("The question option value",value2);
  console.log("The answers array value",answers_array);
  maphash.set(value1, value2);
  console.log("hashmap....... value1 =", maphash.get(value1));
 }

 


    return(
     <>
        <div className="questions-container">
          <div className="background-blue">
          <p><b>Take Quiz</b></p>
          </div>
            
            
            <table>
            <tbody>
           
            {
                questions_array.map((question)=>( 
                    <>             
                   <tr>
                    <td>{question.question_id} </td>
                    <td>{question.question_text}</td>
                    <td></td>
                    <td></td>
            
                      <td> 
                        <label >
                      {question.option1 }
                      <input
                        type="radio"
                        value={question.option1}
                        name={question.question_id}
                        onChange={() => printValue(question.question_id, question.option1)}  
                            />
                        </label>
                      </td>

                      <td> 
                        <label>
                      {question.option2 }
                      <input
                        type="radio"
                        value={question.option2}
                        name={question.question_id}
                        onChange={() => printValue(question.question_id, question.option2)}                        />
                        </label>
                      </td>

                      <td> 
                        <label>
                      {question.option3 }
                      <input
                        type="radio"
                        value={question.option3}
                        name={question.question_id}
                        onChange={() => printValue(question.question_id, question.option3)}                        />
                        </label>
                      </td>


                        </tr>
                       
                        </> 
                    ))
                   
                   
            
            }
            <tr></tr>
            <tr>
            <td>
          <Button  className="btn btn-warning btn-block" onClick={processMarks}  disabled={button_element_disabled}>
          Submit        
          </Button>                 
           </td>
            </tr>


            <tr></tr>
            <tr>
                <td></td>
                
               
            </tr>
            </tbody>
        </table>
        </div>


<div>
  {html_element}
</div>
    
</>
    );
}
export default QuestionPage;