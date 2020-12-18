import React, { useState, useEffect } from 'react'

const SubjectList = () => {
  const [subjects, setSubjects] = useState(null);

  const fetchSubjects = async () => {
    let result = await fetch('/rest/subjects')
    result = await result.json();
    console.log(result);
    setSubjects(result);
  }

  useEffect(() => {
    fetchSubjects();
  }, [])

  return (
    <div>
      {subjects && subjects.map((subject, i) => {
       return <p>{subject.title}</p> 
      })}
    </div>
  )
}
export default SubjectList;