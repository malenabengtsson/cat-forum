import React, { useState, useEffect, useContext } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  ModalFooter
} from "reactstrap";
import {UserContext} from '../contexts/UserContextProvider'
import ModeratorButtonStyle from './ModeratorButtonStyle'

const UserInformationModal = (props) => {
  const [clickedUser, setClickedUser] = useState('')
  const [moderatedThreads, setModeratedThreads] = useState('')
  const { user } = useContext(UserContext);
  const [showAddModeratorInformation, setShowAddModeratorInformation] = useState(false);
  const [showRemoveModeratorInformation, setShowRemoveModeratorInformation] = useState(false);
  const [unModeratedThreads, setUnModeratedThreads] = useState('');

  const fetchUserByUsername = async () =>{
    if(showRemoveModeratorInformation){
      setShowRemoveModeratorInformation(false)
    }
    let result = await fetch('/rest/' + props.username);
    result = await result.json();
    console.log(result);

    if(result != null){
      setClickedUser(result)
      getModeratorInformation(result)
    }
    else{
      setClickedUser(null)
    }
    
  }

  const getModeratorInformation = async (user) => {
let result = await fetch('/rest/moderator/' + user.id)
result = await result.json()
setModeratedThreads(result)
console.log(result);

  }

  const getAllThreads = async () =>{
    let result = await fetch('/rest/threads')
    result = await result.json()

 for (let i = 0; i < moderatedThreads.length; i++) {
   for (let j = 0; j < result.length; j++) {
     if(result[j].id === moderatedThreads[i].id){
       result.splice(j, 1)
     }
   }
 }
    setUnModeratedThreads(result);

  }

  const removeAsModeratorFor= async (thread) =>{
    let result = await fetch(
      "/rest/removeModerator/" + clickedUser.id + "/" + thread.id
    );
    result = await result.json()
   fetchUserByUsername()
  }

  const addAsModerator = async (thread) =>{
    console.log('in function');
 let result = await fetch(
   "/rest/addModerator/" + clickedUser.id + "/" + thread.id
 );
fetchUserByUsername();

  }

  const removeUser = async () =>{
    console.log('in delete');
    let result = await fetch('/rest/deleteUser/' + clickedUser.id)
    fetchUserByUsername()
  }

  useEffect(() => {
    fetchUserByUsername()
  }, [])

  useEffect(() => {
    if(moderatedThreads != null && moderatedThreads !== undefined && moderatedThreads !== ''){
      getAllThreads();

    }
  }, [moderatedThreads])

  return (
    <div className="row mx-auto">
      <Modal isOpen={props.modal} toggle={props.toggle}>
        <h2 className="text-center mt-4 tradeHub-orange font-weight-bold col-12">
          {clickedUser ? clickedUser.username : "User have been deleted"}{" "}
        </h2>
        <ModalBody className="">
          {clickedUser ? (
            <div>
              {moderatedThreads &&
                moderatedThreads.map((x) => (
                  <ModeratorButtonStyle thread={x} title={"MODERATOR"} />
                ))}
            </div>
          ) : (
            ""
          )}
          {user && user.userRole === "admin" && clickedUser != null ? (
            <div>
              <Button
                className="bgc-yellow button-style col-4"
                onClick={() => removeUser()}
              >
                Remove user
              </Button>
              {clickedUser && clickedUser.userRole === "moderator" ? (
                <div>
                  <Button
                    onClick={() =>
                      setShowRemoveModeratorInformation(
                        !showRemoveModeratorInformation
                      )
                    }
                  >
                    Remove as moderator
                  </Button>{" "}
                  <Button
                    className="col-4 bgc-yellow button-style"
                    onClick={() =>
                      setShowAddModeratorInformation(
                        !showAddModeratorInformation
                      )
                    }
                  >
                    Add as moderator
                  </Button>
                </div>
              ) : (
                <Button
                  className="col-4 bgc-yellow button-style"
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
              <h6>
                Click on the thread to remove {clickedUser.username} as a
                moderator
              </h6>

              {moderatedThreads &&
                moderatedThreads.map((x) => (
                  <div onClick={() => removeAsModeratorFor(x)}>
                    <ModeratorButtonStyle thread={x} title={"REMOVE"} />
                  </div>
                ))}
            </div>
          ) : (
            ""
          )}
          {showAddModeratorInformation ? (
            <div>
              <h6>
                Click on the thread to add {clickedUser.username} as a moderator
              </h6>
              {unModeratedThreads &&
                unModeratedThreads.map((x) => (
                  <div onClick={() => addAsModerator(x)}>
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
}
export default UserInformationModal