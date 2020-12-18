import React from 'react'
import { Card, CardText, CardBody, CardTitle } from "reactstrap";
const ThreadItem = ({thread}) =>{

  return (
    <div className="m-4">
      <Card>
        <CardBody>
          <CardTitle tag="h5">{thread.title}</CardTitle>
          <CardText>{thread.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}
export default ThreadItem