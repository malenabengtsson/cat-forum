import React, { useState } from "react";
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

import { Modal } from "reactstrap";

const AuthenticationModal = (props) => {
  const [isRegistered, setIsRegistered] = useState(true);
console.log(props);
  return (
    <div>
      <Modal isOpen={props.modalIsOpen} toggle={props.toggleModal} size="lg">
        {isRegistered ? (
          <LoginModal
            setIsRegistered={setIsRegistered}
            isRegistered={isRegistered}
            toggle={props.toggleModal}
            modalIsOpen={props.modalIsOpen}
            setModalIsOpen={props.setModalIsOpen}
          />
        ) : (
          <RegisterModal
            setIsRegistered={setIsRegistered}
            isRegistered={isRegistered}
            toggle={props.toggleModal}
            modalIsOpen={props.modalIsOpen}
            setModalIsOpen={props.setModalIsOpen}
          />
        )}
      </Modal>
    </div>
  );
};

export default AuthenticationModal;
