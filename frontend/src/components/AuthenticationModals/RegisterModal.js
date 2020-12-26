import React, { useState, useContext } from "react";
import { Button, ModalBody, Form, FormGroup, Label, Input } from "reactstrap";
import {UserContext} from '../../contexts/UserContextProvider'

const RegisterModal = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessageShown, setErrorMessageShown] = useState(false);
     const { fetchUser } = useContext(UserContext);

  const performRegistration = async (e) => {
    e.preventDefault();

    let userInformation = {
      email: email,
      username: username,
      password: password    
    };

    let response = await fetch("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInformation),
    });

    if (response.status === 400) {
      setErrorMessageShown(true);
    } else {
      setErrorMessageShown(false);
      fetchUser();
      props.setModalIsOpen(props.modalIsOpen);
    }
  };
  return (
    <div className="mx-auto authentication-modals">
      <h2 className="mt-4 text-center tradeHub-orange font-weight-bold col-sm-12 col-lg-12">
        Registrera
      </h2>
      <ModalBody className="m-4">
        <Form onSubmit={performRegistration} className="row">
          <FormGroup className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
            <Label for="email" className="tradeHub-orange font-weight-bold">
              Email
            </Label>
            <Input
              className="light-grey-background tradeHub-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
            <Label for="username" className="tradeHub-orange font-weight-bold">
              Username
            </Label>
            <Input
              className="light-grey-background tradeHub-input"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
            <Label for="password">Password</Label>
            <Input
              required
              className="light-grey-background tradeHub-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
          </FormGroup>
          <FormGroup className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
            {errorMessageShown ? (
              <div className="error-text mb-2 text-center font-weight-bold">
                Det finns redan ett konto med den emailadressen
              </div>
            ) : (
              <Label for="password" className="tradeHub-white font-weight-bold">
                ----
              </Label>
            )}
            <Button className="tradeHub-button col-12 font-weight-bold register-button">
              Registrera
            </Button>
          </FormGroup>
        </Form>
        <div className="text-center mt-4">
          <p className="font-italic mb-0">Har du redan ett konto?</p>
          <p className="font-italic">
            {" "}
            Logga in{" "}
            <span className="text-primary click-text inline">
              <span onClick={() => props.setIsRegistered(!props.isRegistered)}>
                här
              </span>
            </span>
          </p>
        </div>
      </ModalBody>
    </div>
  );
};

export default RegisterModal;
