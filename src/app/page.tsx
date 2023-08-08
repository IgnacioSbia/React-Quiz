'use client';
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect } from 'react'

export default function Home() {

  useEffect(()=>{
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=5daffa4220270f4ad0b5041dbbb9ea95");

    var requestOptions:object = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  },[])

  
  return (
  <main className='homePageReactQuiz'>
    <h1>REACT QUIZ</h1>
    <></>
    <button>Start</button>
  </main>
  )
}
