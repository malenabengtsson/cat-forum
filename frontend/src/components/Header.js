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

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
     const { user, setUser } = useContext(UserContext);

  let history = useHistory();
  const toggle = () => setIsOpen(!isOpen);
   const toggleModal = () => {
     setModalIsOpen(!modalIsOpen);
   };

    const goToHomePage = () => {
      history.push("/");
    };
     const goToMyPage = () => {
      // history.push("/mypage");
      console.log('Add mypage here');
     };

     const logout = async () => {
       let res = await fetch("/auth/logout");
       setUser(null);
       history.push("/");
     };
    
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand onClick={goToHomePage} className="pointer">
          Cat forum
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {user === null ? (
              <>
                <NavItem>
                  <NavLink
                    className="pointer"
                    onClick={toggleModal}
                  >
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
                  <NavLink
                    className="pointer"
                    onClick={goToMyPage}
                  >
                    Min sida
                  </NavLink>
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