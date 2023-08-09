'use client';
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState } from 'react'


export default function Home() {
  const [answers, setAnswers] = useState<any>([])
  const [start, setStart] = useState(false)
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
  const handleStart = ()=>{
    setStart(!start)
  }
  console.log(start)
  console.log(answers)

  
  return (
  <main className='homePageReactQuiz'>
    <h1>REACT QUIZ</h1>
    {start ? 
      <div>
        <h1>Hi</h1>
      </div> 
    :
      ''
    }
    
    <button onClick={handleStart}>Start</button>
  </main>
  )
}
