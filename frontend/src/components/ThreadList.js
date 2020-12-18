import React, { useContext, useEffect, useState } from 'react'
import {SubjectContext} from '../contexts/SubjectContextProvider'
import ThreadItem from './ThreadItem'

const ThreadList = () =>{
  const {chosenSubject} = useContext(SubjectContext);
  const [threads, setThreads] = useState(null);

  const fetchThreads = async () =>{
    let result = await fetch('/rest/threads/' + chosenSubject.id)
    result = await result.json();
    console.log(result);
    setThreads(result);
  }

  useEffect(() => {
   fetchThreads()
  }, [])

  return(
    <div>
      {threads && threads.map((thread, i) =>{
        return <ThreadItem thread={thread} key={i}/>
      })}
    </div>
  )
}
export default ThreadList;