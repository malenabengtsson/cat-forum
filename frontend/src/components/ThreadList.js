import React, { useContext, useEffect, useState } from 'react'
import {
 Button
} from 'reactstrap';
import { SubjectContext } from '../contexts/SubjectContextProvider'
import {UserContext} from '../contexts/UserContextProvider'
import ThreadItem from './ThreadItem'
import CreateNewThreadModal from './CreateNewThreadModal'

const ThreadList = () =>{
  const { chosenSubject } = useContext(SubjectContext);
  const {user} = useContext(UserContext)
  const [threads, setThreads] = useState(null);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const fetchThreads = async () =>{
    let result = await fetch('/rest/threads/' + chosenSubject.id)
    result = await result.json();
    console.log(result);
    setThreads(result);
  }

  useEffect(() => {
   fetchThreads()
  }, [])

  return (
    <div className="m-4">
      {user ? (
        <div className="m-4">
          <Button
            className="bgc-yellow button-style"
            onClick={toggle}
          >
            Create new thread
          </Button>
          <CreateNewThreadModal
            toggle={toggle}
            modal={modal}
            setModal={setModal}
            fetchThreads={fetchThreads}
          />
        </div>
      ) : (
        ""
      )}
      {threads &&
        threads.map((thread, i) => {
          return <ThreadItem thread={thread} key={i} />;
        })}
    </div>
  );
}
export default ThreadList;