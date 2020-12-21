import React, { useContext, useState, useEffect } from 'react'

import {SubjectContext} from '../contexts/SubjectContextProvider'
import ReplyItem from './ReplyItem'

const ReplyList = () =>{
  const [replies, setReplies] = useState(null)
  const {chosenThread} = useContext(SubjectContext);

  const fetchReplies = async () =>{
    let result = await fetch('/rest/replies/' + chosenThread.id)
    result = await result.json();
    setReplies(result)
  }

  useEffect(() => {
  fetchReplies()
  }, [])

  return(
    <div>
      {replies && replies.map((reply, i) =>{
        return <ReplyItem reply={reply} key={i}/>
      })}
    </div>
  )
}
export default ReplyList