import React, { useState, useEffect, useContext } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
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
    let result = await fetch('/rest/' + props.username);
    result = await result.json();
    setClickedUser(result)

    if(result.userRole === 'moderator'){
      getModeratorInformation(result)
    }
  }

  const getModeratorInformation = async (user) => {
    console.log('In get info');
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
       console.log('In if');
       result.splice(j, 1)
     }
   }
 }


console.log(result);
    setUnModeratedThreads(result);

  }

  const removeAsModeratorFor= async (thread) =>{
    let result = await fetch(
      "/rest/removeModerator/" + clickedUser.id + "/" + thread.id
    );
    result = await result.json()
    getModeratorInformation(clickedUser)
    console.log(moderatedThreads);
  }

  const addAsModerator = async (thread) =>{
    console.log('in function');
 let result = await fetch(
   "/rest/addModerator/" + clickedUser.id + "/" + thread.id
 );
 getModeratorInformation(clickedUser)
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
          {clickedUser ? clickedUser.username : "Nothing here"}{" "}
        </h2>
        <ModalBody className="">
          {clickedUser && clickedUser.userRole === "moderator" ? (
            <div>
              <p className="m-2">
                {clickedUser.username} is moderator for following threads:
              </p>
              {moderatedThreads &&
                moderatedThreads.map((x) => <p className="m-2">{x.title}</p>)}
            </div>
          ) : (
            <p>{clickedUser.username} is not a moderator for any threads</p>
          )}
          {user && user.userRole === "admin" ? (
            clickedUser && clickedUser.userRole === "moderator" ? (
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
                  onClick={() =>
                    setShowAddModeratorInformation(!showAddModeratorInformation)
                  }
                >
                  Add as moderator
                </Button>
              </div>
            ) : (
              <Button
                onClick={() =>
                  setShowAddModeratorInformation(!showAddModeratorInformation)
                }
              >
                Add as moderator
              </Button>
            )
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
                    <ModeratorButtonStyle
                      thread={x}
                    />
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
                    <ModeratorButtonStyle
                      thread={x}
                    />
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