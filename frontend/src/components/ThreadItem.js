import React, { useContext } from 'react'
import { Card, CardText, CardBody, CardTitle } from "reactstrap";
import { useHistory } from "react-router-dom";
import {SubjectContext} from '../contexts/SubjectContextProvider'
const ThreadItem = ({thread}) =>{
  const {setChosenThread, chosenSubject} = useContext(SubjectContext)
  let history = useHistory();

  const goToReplyPage = () =>{
    setChosenThread(thread);
    history.push("/" + chosenSubject.title.replace(" ", "-") + "/" + thread.title.replace(' ', '-'));

  }

  return (
    <div className="m-4">
      <Card onClick={goToReplyPage}>
        <CardBody>
          <CardTitle tag="h5">{thread.title}</CardTitle>
          <CardText>{thread.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}
export default ThreadItem