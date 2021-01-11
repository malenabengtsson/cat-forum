import React, { useContext, useState } from "react";
import {
  Alert,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardFooter,
  Button,
} from "reactstrap";
import { UserContext } from "../contexts/UserContextProvider";
import UserInformationModal from "./UserInformationModal";

const ReplyItem = ({ reply, isModerator, fetchReplies }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const { user } = useContext(UserContext);

  const getDate = () => {
    let date = new Date(reply.timestamp);
    let yearMonthAndDay = date.toLocaleDateString();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    let finalDate =
      yearMonthAndDay +
      " " +
      (hours < 10 ? "0" + hours : hours) +
      ":" +
      (minutes < 10 ? "0" + minutes : minutes);

    return finalDate;
  };

  const deleteReply = async () => {
    await fetch("/rest/deleteReply/" + reply.id);
    fetchReplies();
  };
  return (
    <div className="m-4">
      {reply.warning === 0 ? (
        <Card className="bgc-sand no-border">
          <CardBody>
            <CardTitle>
              <span className="pointer font-weight-bold" onClick={toggle}>
                {reply.sender}
              </span>{" "}
              <span>{getDate()}</span>
              <UserInformationModal
                toggle={toggle}
                modal={modal}
                setModal={setModal}
                username={reply.sender}
              />
            </CardTitle>
            <CardText>{reply.message}</CardText>
          </CardBody>
          {user ? (
            isModerator || user.userRole === "admin" ? (
              <CardFooter className="text-muted">
                <Button
                  className="m-0 pointer bgc-yellow button-style"
                  onClick={() => deleteReply()}
                >
                  Delete reply
                </Button>
              </CardFooter>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </Card>
      ) : (
        <Alert color="danger">
          <Card className="bcg-sand">
            <CardBody>
              <span className="pointer font-weight-bold" onClick={toggle}>
                {reply.sender}
              </span>{" "}
              <span>{getDate()}</span>
              <UserInformationModal
                toggle={toggle}
                modal={modal}
                setModal={setModal}
                username={reply.sender}
              />
              <CardText>{reply.message}</CardText>
            </CardBody>
            {user ? (
              isModerator || user.userRole === "admin" ? (
                <CardFooter className="text-muted">
                  <Button
                    className="m-0 pointer bgc-yellow button-style"
                    onClick={() => deleteReply()}
                  >
                    Delete reply
                  </Button>
                </CardFooter>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </Card>
        </Alert>
      )}
    </div>
  );
};
export default ReplyItem;
