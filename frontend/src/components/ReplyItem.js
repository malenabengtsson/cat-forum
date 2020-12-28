import React from 'react'
import { Card, CardText, CardBody, CardTitle } from "reactstrap";
const ReplyItem = ({reply}) =>{

const getDate = () =>{
  let date = new Date(reply.timestamp)
  let yearMonthAndDay = date.toLocaleDateString()
   let hours = date.getHours();
   let minutes = date.getMinutes()
  
   let finalDate =
     yearMonthAndDay + " " + (hours < 10 ? "0" + hours : hours) + ":" +( minutes < 10
       ? "0" + minutes
       : minutes);
  
  console.log(finalDate);

  return finalDate;
}
  return (
    <div className="m-4">
      <Card>
        <CardBody>
          <CardTitle tag="h5">
            {reply.sender} {getDate()}
          </CardTitle>
          <CardText>{reply.message}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}
export default ReplyItem