import React, {useContext, useState} from 'react'
import { Card, CardText, CardBody, CardTitle, CardFooter } from "reactstrap";
import {UserContext} from '../contexts/UserContextProvider'
import UserInformationModal from './UserInformationModal'
const ReplyItem = ({reply, isModerator, fetchReplies}) =>{
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const {user} = useContext(UserContext);

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

const deleteReply = async () => {
  console.log('in delete reply');
await fetch('/rest/deleteReply/' + reply.id);
fetchReplies();

}
  return (
    <div className="m-4">
      <Card>
        <CardBody>
          <CardTitle tag="h5">
            <span className="pointer" onClick={toggle}>
              {reply.sender}{" "}
              <UserInformationModal
                toggle={toggle}
                modal={modal}
                setModal={setModal}
                username={reply.sender}
              />
            </span>{" "}
            {getDate()}
          </CardTitle>
          <CardText>{reply.message}</CardText>
        </CardBody>
        { user ? isModerator || user.userRole === "admin" ? 
        <CardFooter className="text-muted">
          <p className="m-0 pointer" onClick={() => deleteReply()}>
            Delete reply
          </p>
        </CardFooter> : '' : ''
        }
        
      </Card>
    </div>
  );
}
export default ReplyItem