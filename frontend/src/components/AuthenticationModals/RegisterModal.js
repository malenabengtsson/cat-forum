import React, { useState, useContext } from "react";
import { Button, ModalBody, Form, FormGroup, Label, Input } from "reactstrap";
import { UserContext } from "../../contexts/UserContextProvider";

const RegisterModal = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const { fetchUser } = useContext(UserContext);

  const performRegistration = async (e) => {
    e.preventDefault();

    if(password.length >= 6){
    let userInformation = {
      email: email,
      username: username,
      password: password,
      roleId: 1,
    };

    let response = await fetch("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInformation),
    });

    response = await response.json();

    if (response.error === "username") {
      setErrorMessage("The username is already taken");
    } else if (response.error === "email") {
      setErrorMessage("The email has already been registered");
    } else if (response.error === "username email") {
      setErrorMessage(
        "Email is already registered and username is already taken"
      );
    } else {
      setErrorMessage(null);
      fetchUser();
      props.setModalIsOpen(!props.modalIsOpen);
    }
  }
  else{
    setErrorMessage("Password has to be longer than 5 letters")
  }
  };
  return (
    <div className="mx-auto authentication-modals">
      <h2 className="mt-4 text-center font-weight-bold col-sm-12 col-lg-12">
        Register
      </h2>
      <ModalBody className="m-4">
        <Form onSubmit={performRegistration} className="row">
          <FormGroup className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
            <Label for="email" className=" font-weight-bold">
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
            <Label for="username" className=" font-weight-bold">
              Username
            </Label>
            <Input
              className=""
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
            <Label className="font-weight-bold" for="password">
              Password
            </Label>
            <Input
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
          </FormGroup>
          <FormGroup className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
            {errorMessage !== null ? (
              <div className="error-text mb-2 text-center font-weight-bold">
                {errorMessage}
              </div>
            ) : (
              <Label for="password" className="text-white font-weight-bold">
                ----
              </Label>
            )}
            <Button className="bgc-yellow button-style col-12 font-weight-bold register-button">
              Register
            </Button>
          </FormGroup>
        </Form>
        <div className="text-center mt-4">
          <p className="font-italic mb-0">Already have an account?</p>
          <p className="font-italic">
            Log in{" "}
            <span className="text-primary click-text inline">
              <span onClick={() => props.setIsRegistered(!props.isRegistered)}>
                here
              </span>
            </span>
          </p>
        </div>
      </ModalBody>
    </div>
  );
};

export default RegisterModal;
