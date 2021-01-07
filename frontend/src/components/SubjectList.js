import React, { useEffect, useContext } from 'react'
import SubjectItem from './SubjectItem'
import { SubjectContext} from '../contexts/SubjectContextProvider'

const SubjectList = () => {
  const { fetchSubjects, subjects } = useContext(SubjectContext)

  useEffect(() => {
    fetchSubjects();
  }, [])

  return (
    <div>
      {subjects && subjects.map((subject, i) => {
       return <SubjectItem subject={subject} key={i}/> 
      })}
    </div>
  )
}
export default SubjectList;