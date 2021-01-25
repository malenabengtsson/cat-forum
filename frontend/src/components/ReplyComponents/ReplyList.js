import React, { useContext, useState, useEffect } from "react";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Input,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardFooter,
} from "reactstrap";
import { SubjectContext } from "../../contexts/SubjectContextProvider";
import { UserContext } from "../../contexts/UserContextProvider";
import ReplyItem from "./ReplyItem";

const ReplyList = () => {
  const [replies, setReplies] = useState(null);
  const [newReply, setNewReply] = useState("");
  const [threadIsLocked, setThreadIsLocked] = useState(false);
  const [warningReply, setWarningReply] = useState(false);
  const { chosenThread } = useContext(SubjectContext);
  const { user } = useContext(UserContext);
  const [isModerator, setIsModerator] = useState("");

  const fetchReplies = async () => {
    let result = await fetch("/rest/replies/" + chosenThread.id);
    result = await result.json();
    setReplies(result);

    if (chosenThread.locked === 1) {
      setThreadIsLocked(true);
    }
  };

  const sendReply = async (e) => {
    e.preventDefault();
    let replyInformation = {
      message: newReply,
      warning: warningReply === true ? 1 : 0,
    };

    await fetch("/rest/replies/" + chosenThread.id, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(replyInformation),
    });
    setNewReply("");
    fetchReplies();
  };

  const isLoggedInUserModeratorForThread = async () => {
    let result = await fetch("/rest/moderator/" + user.id);
    result = await result.json();

    result.forEach((thread) => {
      if (thread.id === chosenThread.id) {
        setIsModerator(true);
      }
    });
  };

  const lockThread = async () => {
    await fetch("/rest/lockThread/" + chosenThread.id);
    setThreadIsLocked(true);
  };

  const toggleWarningReply = () => {
    setWarningReply(!warningReply);
  };

  useEffect(() => {
    fetchReplies();
    if (user != null) {
      isLoggedInUserModeratorForThread();
    }

    return () => {
      setWarningReply(false);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2 className="m-4">{chosenThread.title}</h2>
      {replies &&
        replies.map((reply, i) => {
          return (
            <ReplyItem
              reply={reply}
              key={i}
              isModerator={isModerator}
              fetchReplies={fetchReplies}
              warningReply={warningReply}
            />
          );
        })}
      {user ? (
        chosenThread && threadIsLocked === false ? (
          <div className="m-4">
            <Card className="bgc-sand no-border">
              <CardBody className="bgc-sand">
                <CardTitle tag="h5">Write a reply</CardTitle>
                <CardText>
                  <Form onSubmit={sendReply}>
                    <FormGroup>
                      <Input
                        type="textarea"
                        placeholder="Write your reply here..."
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                        required
                      />
                    </FormGroup>
                    <Button className="bgc-yellow button-style">
                      Send reply
                    </Button>
                  </Form>
                </CardText>
              </CardBody>
              {isModerator ||
              (user.userRole === "admin" && threadIsLocked === false) ? (
                <CardFooter className="text-muted">
                  <Button
                    className="mr-2 pointer bgc-yellow button-style"
                    onClick={() => lockThread()}
                  >
                    Lock thread
                  </Button>
                  <Button
                    className="bgc-yellow button-style"
                    onClick={() => toggleWarningReply()}
                    active={warningReply}
                  >
                    Warning reply
                  </Button>
                </CardFooter>
              ) : (
                ""
              )}
            </Card>
          </div>
        ) : (
          <Alert color="danger">Thread has been locked</Alert>
        )
      ) : (
        ""
      )}
    </div>
  );
};
export default ReplyList;
