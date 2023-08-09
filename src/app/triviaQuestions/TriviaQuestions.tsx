import React from 'react'
import './triviaQuestions.css';
import { useEffect, useState } from 'react'


function TriviaQuestions() {
    const [answers, setAnswers] = useState<any>([])
  
    useEffect(()=>{
      var myHeaders = new Headers();
      myHeaders.append("Cookie", "PHPSESSID=5daffa4220270f4ad0b5041dbbb9ea95");
  
      var requestOptions:object = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
  
      fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple", requestOptions)
        .then(response => response.json())
        .then(result => setAnswers(result.results))
        .catch(error => console.log('error', error));
    },[])
  return (
    <main>
        <h1>{answers[0].question}</h1>
    </main>
  )
}

export default TriviaQuestions