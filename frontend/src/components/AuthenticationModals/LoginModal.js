import React, { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContextProvider";
import { Button, ModalBody, Form, FormGroup, Label, Input } from "reactstrap";

const LoginModal = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessageShown, setErrorMessageShown] = useState(false);
  const { setUser, fetchUser } = useContext(UserContext);

  const performLogin = async (e) => {
    console.log('In login method in frontend');
    e.preventDefault();

    const credentials =
     {email: email,
      password: password
    }
    console.log(credentials);

    await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

      fetchUser();
      setErrorMessageShown(false);
      props.setModalIsOpen(!props.modalIsOpen);
    
  };
  return (
    <div className="row mx-auto authentication-modals">
      <h2 className="text-center mt-4 tradeHub-orange font-weight-bold col-12">
        Logga in
      </h2>
      <ModalBody className="">
        <Form onSubmit={performLogin}>
          <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12 m-0">
            <Label
              for="emailAddress"
              className="tradeHub-dark-grey font-weight-bold"
            >
              Email
            </Label>
            <Input
              required
              className="light-grey-background tradeHub-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12 mt-2">
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
          <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12 mt-2">
            {errorMessageShown ? (
              <div className="error-text mb-2 text-center font-weight-bold">
                Felaktigt användarnamn eller lösenord{" "}
              </div>
            ) : (
              ""
            )}
            <Button className="tradeHub-button col-xs-8 col-sm-12 col-md-12 col-lg-12 font-weight-bold">
              Logga in
            </Button>
          </FormGroup>
        </Form>
        <div className="text-center m-4">
          <p className="font-italic mb-0">Har du inte ett konto?</p>
          <p className="font-italic">
            {" "}
            Skapa konto{" "}
            <span className="text-primary inline pointer">
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

export default LoginModal;
