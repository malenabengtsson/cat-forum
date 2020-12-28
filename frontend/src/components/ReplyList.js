import React, { useContext, useState, useEffect } from 'react'
import { Button, Form, FormGroup, Input,Card, CardText, CardBody, CardTitle } from "reactstrap";
import {SubjectContext} from '../contexts/SubjectContextProvider'
import {UserContext} from '../contexts/UserContextProvider'
import ReplyItem from './ReplyItem'

const ReplyList = () =>{
  const [replies, setReplies] = useState(null)
  const [newReply, setNewReply] = useState('')
  const {chosenThread} = useContext(SubjectContext);
  const {user} = useContext(UserContext);
  
  const fetchReplies = async () =>{
    let result = await fetch('/rest/replies/' + chosenThread.id)
    result = await result.json();
    setReplies(result)
  }

  const sendReply = async (e) =>{
e.preventDefault()
 let replyInformation = {
   message: newReply,
   sender: user.username,
 };
  let reply = await fetch("/rest/replies/" + chosenThread.id, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(replyInformation),
  });
  setNewReply('')
  fetchReplies()
  }

  useEffect(() => {
  fetchReplies()
  }, [])

  return (
    <div>
      {replies &&
        replies.map((reply, i) => {
          return <ReplyItem reply={reply} key={i} />;
        })}
      {user ? (
        <div className="m-4">
          <Card>
            <CardBody>
              <CardTitle tag="h5">Write a reply</CardTitle>
              <CardText>
                <Form onSubmit={sendReply}>
                  <FormGroup>
                    <Input
                      type="textarea"
                      placeholder="Write your reply here..."
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                    />
                  </FormGroup>
                  <Button>Send reply</Button>
                </Form>
              </CardText>
            </CardBody>
          </Card>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default ReplyList