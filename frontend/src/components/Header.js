import React, {useState} from 'react'
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

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
  let history = useHistory();
  const toggle = () => setIsOpen(!isOpen);

    const goToHomePage = () => {
      history.push("/");
    };
  return (
   <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand onClick={goToHomePage}>Cat forum</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink >Logga in</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}
export default Header;