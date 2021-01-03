import React from 'react'
import {Alert, Card, CardText, CardBody, CardTitle } from "reactstrap";


const ModeratorButtonStyle = (props) =>{
  return (
    <div>
      <Card className="mb-4 pointer">
        <CardTitle className="text-left gray-text">
          {props.title === 'MODERATOR' ?  <Alert color="info">{props.title}</Alert> : props.title === "ADD" ?  <Alert color="success">{props.title}</Alert> : props.title === "REMOVE" ? <Alert color="danger">{props.title}</Alert> : '' }
         
        </CardTitle>
        <CardBody className="pt-0 ">
          <CardText>{props.thread.title}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}
export default ModeratorButtonStyle