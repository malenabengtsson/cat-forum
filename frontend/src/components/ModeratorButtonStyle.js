import React from 'react'
import { Card, CardText, CardBody, CardTitle } from "reactstrap";


const ModeratorButtonStyle = (props) =>{
  return (
    <div className="m-4 pointer">
      <Card>
        <CardBody>
          <CardText>{props.thread.title}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}
export default ModeratorButtonStyle