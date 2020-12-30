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

const UserInformationModal = (props) => {
  const [clickedUser, setClickedUser] = useState('')
  const [moderatedThreads, setModeratedThreads] = useState('')
  const { user } = useContext(UserContext);
  const [showAddModeratorInformation, setShowAddModeratorInformation] = useState(false);
  const [showRemoveModeratorInformation, setShowRemoveModeratorInformation] = useState(false);
  const [unModeratedThreads, setUnModeratedThreads] = useState('');

  const fetchUserByUsername = async () =>{
    console.log(props.username);
    let result = await fetch('/rest/' + props.username);
    result = await result.json();
    setClickedUser(result)

    if(result.userRole === 'moderator'){
      getModeratorInformation(result)
    }
  }

  const getModeratorInformation = async (user) => {
let moderatedThreads = await fetch('/rest/moderator/' + user.id)
moderatedThreads = await moderatedThreads.json()
setModeratedThreads(moderatedThreads)

  }

  const getAllThreads = async () =>{
    console.log(clickedUser.id);
    let result = await fetch('/rest/threads')
    result = await result.json()
console.log(result);
let filteredArray = []
result = result.map(x =>{
  moderatedThreads.map(y =>{
    if(x.title === y.title){
     console.log(x);
    }
    else{
filteredArray.push(x);
    }
  })
})
    setUnModeratedThreads(filteredArray);

  }

  const removeAsModeratorFor= async (thread) =>{
    let result = await fetch(
      "/rest/removeModerator/" + clickedUser.id + "/" + thread.id
    );
    getModeratorInformation()
    console.log(moderatedThreads);
  }

  const addAsModerator = async (thread) =>{
 let result = await fetch(
   "/rest/addModerator/" + clickedUser.id + "/" + thread.id
 );
 getModeratorInformation()
  }

  useEffect(() => {
    fetchUserByUsername()
  }, [])

  useEffect(() => {
    console.log(clickedUser);
    if(clickedUser != null){
      //Fetch all threads that the user isnt already a moderator for 
      getAllThreads();

    }
  }, [clickedUser])

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
                  <Button onClick={() => removeAsModeratorFor(x)}>
                    {x.title}
                  </Button>
                ))}
            </div>
          ) : (
            ""
          )}
          {showAddModeratorInformation ? (
            <div>
              <h6>
                Click on the thread to add {clickedUser.username} as a
                moderator
              </h6>
              {unModeratedThreads &&
                unModeratedThreads.map((x) => (
                  <Button onClick={() => addAsModerator(x)}>
                    {x.title}
                  </Button>
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