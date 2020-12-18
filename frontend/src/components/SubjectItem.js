import React, { useContext } from 'react'
import { useHistory } from "react-router-dom";
import {
  Card, CardText, CardBody,
  CardTitle, 
} from 'reactstrap';
import {SubjectContext} from '../contexts/SubjectContextProvider'

const SubjectItem = ({subject}) =>{
  console.log(subject);
  const {setChosenSubject} = useContext(SubjectContext)
  let history = useHistory();
  
  const goToSubject = () =>{
    setChosenSubject(subject);
    history.push("/" + subject.title.replace(' ', '-'));

  }

  return (
    <div className="m-4">
      <Card onClick={() => goToSubject()}>
        <CardBody>
          <CardTitle tag="h5">{subject.title}</CardTitle>
          <CardText>
            {subject.description}
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
}

export default SubjectItem