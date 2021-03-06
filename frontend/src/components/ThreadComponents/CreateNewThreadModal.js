import React, { useState, useContext } from "react";
import {
  Button,
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { SubjectContext } from "../../contexts/SubjectContextProvider";
import { UserContext } from "../../contexts/UserContextProvider";

const CreateNewThreadModal = (props) => {
  const [threadTitle, setThreadTitle] = useState("");
  const [message, setMessage] = useState("");
  const { chosenSubject } = useContext(SubjectContext);
  const { user } = useContext(UserContext);

  const createThread = async (e) => {
    e.preventDefault();

    let threadInformation = {
      title: threadTitle,
      creator: user.username,
      locked: 0,
    };

    let replyInformation = {
      message: message,
      sender: user.username,
      warning: 0,
    };

    let thread = await fetch("/rest/threads/" + chosenSubject.id, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(threadInformation),
    });

    thread = await thread.json();

    await fetch("/rest/replies/" + thread.lastInsertRowid, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(replyInformation),
    });
    props.toggle();
    props.fetchThreads();
  };
  return (
    <div className="row mx-auto">
      <Modal isOpen={props.modal} toggle={props.toggle}>
        <h2 className="text-center mt-4 tradeHub-orange font-weight-bold col-12">
          Create new thread
        </h2>
        <ModalBody className="">
          <Form onSubmit={createThread}>
            <FormGroup>
              <Label for="threadTitle">Title</Label>
              <Input
                required
                type="text"
                placeholder="Title"
                value={threadTitle}
                onChange={(e) => setThreadTitle(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="threadTitle">Message</Label>
              <Input
                required
                type="textarea"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Button className=" bgc-yellow button-style">
                Create thread
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CreateNewThreadModal;
