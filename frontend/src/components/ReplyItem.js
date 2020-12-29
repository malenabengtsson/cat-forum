import React, {useContext, useState} from 'react'
import { Card, CardText, CardBody, CardTitle } from "reactstrap";
import {UserContext} from '../contexts/UserContextProvider'
import UserInformationModal from './UserInformationModal'
const ReplyItem = ({reply}) =>{
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

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
            <p onClick={toggle}>{reply.sender} <UserInformationModal toggle={toggle} modal={modal} setModal={setModal} username={reply.sender}/></p> {getDate()}
          </CardTitle>
          <CardText>{reply.message}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}
export default ReplyItem