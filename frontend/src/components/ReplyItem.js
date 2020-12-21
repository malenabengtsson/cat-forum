import React from 'react'
import { Card, CardText, CardBody, CardTitle } from "reactstrap";
const ReplyItem = ({reply}) =>{
console.log(reply);
  return (
    <div className="m-4">
      <Card>
        <CardBody>
          <CardTitle tag="h5">Svar</CardTitle>
          <CardText>{reply.message}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}
export default ReplyItem