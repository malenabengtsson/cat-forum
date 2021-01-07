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

   let result = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    result = await result.json()
   console.log(result);
    if(result != null){
      fetchUser();
      setErrorMessageShown(false);
      props.setModalIsOpen(!props.modalIsOpen);
      setErrorMessageShown(false)
    }
    else{
      setErrorMessageShown(true)

    }
    
  };
  return (
    <div className="row mx-auto authentication-modals">
      <h2 className="text-center mt-4 font-weight-bold col-12">Logga in</h2>
      <ModalBody className="">
        <Form onSubmit={performLogin}>
          <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12 m-0">
            <Label for="emailAddress" className=" font-weight-bold">
              Email
            </Label>
            <Input
              required
              className=""
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12 mt-2">
            <Label className="font-weight-bold" for="password">
              Password
            </Label>
            <Input
              required
              className=""
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
          </FormGroup>
          <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12 mt-2">
            {errorMessageShown ? (
              <div className="error-text mb-2 text-center font-weight-bold">
                Wrong username or password{" "}
              </div>
            ) : (
              ""
            )}
            <Button className="bgc-yellow button-style col-xs-8 col-sm-12 col-md-12 col-lg-12 font-weight-bold">
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
              <span
                className="pointer"
                onClick={() => props.setIsRegistered(!props.isRegistered)}
              >
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
