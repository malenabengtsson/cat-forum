import React, { useState, useEffect, useContext } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import { UserContext } from "../contexts/UserContextProvider";
import ModeratorButtonStyle from "./ModeratorButtonStyle";

const UserInformationModal = (props) => {
  const [clickedUser, setClickedUser] = useState("");
  const [moderatedThreads, setModeratedThreads] = useState("");
  const { user } = useContext(UserContext);
  const [
    showAddModeratorInformation,
    setShowAddModeratorInformation,
  ] = useState(false);
  const [
    showRemoveModeratorInformation,
    setShowRemoveModeratorInformation,
  ] = useState(false);
  const [unModeratedThreads, setUnModeratedThreads] = useState("");

  const fetchUserByUsername = async () => {
    // if (showRemoveModeratorInformation) {
    //   setShowRemoveModeratorInformation(false);
    // }
    let result = await fetch("/rest/" + props.username);
    result = await result.json();

    if (result != null) {
      setClickedUser(result);
      getModeratorInformation(result);
    } else {
      setClickedUser(null);
    }
  };

  const getModeratorInformation = async (user) => {
    let result = await fetch("/rest/moderator/" + user.id);
    result = await result.json();
    setModeratedThreads(result);
  };

  const getAllThreads = async () => {
    let result = await fetch("/rest/threads");
    result = await result.json();

    for (let i = 0; i < moderatedThreads.length; i++) {
      for (let j = 0; j < result.length; j++) {
        if (result[j].id === moderatedThreads[i].id) {
          result.splice(j, 1);
        }
      }
    }
    setUnModeratedThreads(result);
  };

  const removeAsModeratorFor = async (thread) => {
    await fetch("/rest/removeModerator/" + clickedUser.id + "/" + thread.id);
    fetchUserByUsername();
  };

  const addAsModerator = async (thread) => {
    await fetch("/rest/addModerator/" + clickedUser.id + "/" + thread.id);
    fetchUserByUsername();
  };

  const removeUser = async () => {
    await fetch("/rest/deleteUser/" + clickedUser.id);
    fetchUserByUsername();
  };

  useEffect(() => {
    fetchUserByUsername();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      moderatedThreads != null &&
      moderatedThreads !== undefined &&
      moderatedThreads !== ""
    ) {
      getAllThreads();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moderatedThreads]);

  return (
    <div className="row mx-auto">
      <Modal isOpen={props.modal} toggle={props.toggle} size="lg">
        <h2 className="text-center mt-4 tradeHub-orange font-weight-bold col-12">
          {clickedUser ? clickedUser.username : "User have been deleted"}{" "}
        </h2>
        <ModalBody>
          {clickedUser ? (
            <div>
              {moderatedThreads &&
                moderatedThreads.map((x, i) => (
                  <ModeratorButtonStyle
                    key={i}
                    thread={x}
                    title={"MODERATOR"}
                  />
                ))}
            </div>
          ) : (
            ""
          )}
          {user && user.userRole === "admin" && clickedUser != null ? (
            <div className="row justify-content-center">
              <Button
                className="bgc-yellow button-style col-3 m-2"
                onClick={() => removeUser()}
              >
                Remove user
              </Button>
              {clickedUser && clickedUser.userRole === "moderator" ? (
                <>
                  <Button
                    className="col-3 bgc-yellow button-style m-2"
                    active={showRemoveModeratorInformation}
                    onClick={() =>
                      setShowRemoveModeratorInformation(
                        !showRemoveModeratorInformation
                      )
                    }
                  >
                    Remove as moderator
                  </Button>
                  <Button
                    className="col-3 bgc-yellow button-style m-2"
                    active={showAddModeratorInformation}
                    onClick={() =>
                      setShowAddModeratorInformation(
                        !showAddModeratorInformation
                      )
                    }
                  >
                    Add as moderator
                  </Button>
                </>
              ) : (
                <Button
                  className="col-3 bgc-yellow button-style m-2"
                  active={showAddModeratorInformation}
                  onClick={() =>
                    setShowAddModeratorInformation(!showAddModeratorInformation)
                  }
                >
                  Add as moderator
                </Button>
              )}
            </div>
          ) : (
            ""
          )}
          {showRemoveModeratorInformation ? (
            <div>
              {moderatedThreads &&
                moderatedThreads.map((x, i) => (
                  <div key={i} onClick={() => removeAsModeratorFor(x)}>
                    <ModeratorButtonStyle
                      onClick={() => removeAsModeratorFor(x)}
                      thread={x}
                      title={"REMOVE"}
                    />
                  </div>
                ))}
            </div>
          ) : (
            ""
          )}
          {showAddModeratorInformation ? (
            <div>
              {unModeratedThreads &&
                unModeratedThreads.map((x, i) => (
                  <div key={i} onClick={() => addAsModerator(x)}>
                    <ModeratorButtonStyle thread={x} title={"ADD"} />
                  </div>
                ))}
            </div>
          ) : (
            ""
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};
export default UserInformationModal;
