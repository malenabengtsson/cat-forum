import React, {useState, useContext} from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { useHistory } from "react-router-dom";
import {UserContext} from '../contexts/UserContextProvider'
import AuthenticationModal from './AuthenticationModals/AuthenticationModal'
import UserInformationModal from './UserInformationModal'
import catLogo from '../images/catforum.png'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
     const { user, setUser } = useContext(UserContext);
     const [userModal, setUserModal] = useState(false);
     const Usertoggle = () => setUserModal(!userModal);

  let history = useHistory();
  const toggle = () => setIsOpen(!isOpen);
   const toggleModal = () => {
     setModalIsOpen(!modalIsOpen);
   };

    const goToHomePage = () => {
      history.push("/");
    };
  

     const logout = async () => {
       await fetch("/auth/logout");
       setUser(null);
       history.push("/");
     };
    
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand className="pointer">
          <img src={catLogo}
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {user === null ? (
              <>
                <NavItem>
                  <NavLink className="pointer" onClick={toggleModal}>
                    Logga in
                  </NavLink>
                  <AuthenticationModal
                    modalIsOpen={modalIsOpen}
                    toggleModal={toggleModal}
                    setModalIsOpen={setModalIsOpen}
                  />
                </NavItem>
              </>
            ) : (
              <>
                <NavItem className="">
                  <NavLink className="pointer" onClick={Usertoggle}>
                    Min sida
                  </NavLink>
                  <UserInformationModal
                    toggle={Usertoggle}
                    modal={userModal}
                    setModal={setUserModal}
                    username={user.username}
                  />
                </NavItem>
                <NavItem className="">
                  <NavLink className="pointer" onClick={logout}>
                    Logga ut
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
export default Header;