'use client';
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState } from 'react'


export default function Home() {
  const [answers, setAnswers] = useState<any>([]);
  const [start, setStart] = useState(false);
  const [step, setStep] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selected, setSelected] = useState(false);
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
  const decodeHtml=(html:string)=>{
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  const handleScore = (type:boolean)=>{
      if(type){
        setCorrectCount(correctCount+1)
      };
      setSelected(!selected)
  };
  const handleStep = ()=>{
    if(step <= answers.length){
      setStep(step+1)
      setSelected(false)
    };
  };
  const handleStart = ()=>{
    setStart(!start)
  };
  console.log(start);
  console.log(answers);
  console.log(step);
  
  return (
  <main className='homePageReactQuiz'>
    <h1 className='quizTitle'>REACT QUIZ</h1>
    {start && answers.length > 0 && step<=9? 
      <div className='quizSection'>
        <h4>score: {correctCount}</h4>
        <h4 className='quizQuestionQuestion'>{decodeHtml(answers[step].question)}</h4>
        <ul className='quizList'>
          <li><button onClick={()=>handleScore(true)} className="quizQuestion" id={selected ? 'quizCorrect' : ''} disabled={selected}>{answers[step].correct_answer}</button></li>
          {answers[step].incorrect_answers.map((e:any)=>{
            return <li><button onClick={()=>handleScore(false)} className="quizQuestion" id={selected ? 'quizIncorrect': ''} disabled={selected}>{e}</button></li>
          })}
        </ul>
        {selected ? <button onClick={handleStep} className='quizPageStartNextButton' id='quizNextButton'>Next</button>: ''}
      </div> 
    :start && answers.length<=0?
      <h1 className='quizLoadingScreen'>Loading...</h1>
    : start && step>=9?  
          <h1>Thank you for completing our small React Quiz!</h1>
    : ''
    }
    
    {start ? '': <button onClick={handleStart} className='quizPageStartNextButton' id='quizPageStartButton'>Start</button>}
  </main>
  )
}
