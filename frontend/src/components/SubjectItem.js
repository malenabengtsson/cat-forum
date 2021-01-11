import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardText, CardBody, CardTitle } from "reactstrap";
import { SubjectContext } from "../contexts/SubjectContextProvider";

const SubjectItem = ({ subject }) => {
  const { setChosenSubject } = useContext(SubjectContext);
  let history = useHistory();

  const goToSubject = () => {
    setChosenSubject(subject);
    history.push("/" + subject.title.replace(/\s+/g, "-"));
  };

  return (
    <div className="m-4 pointer">
      <Card className="no-border" onClick={() => goToSubject()}>
        <CardBody className="bgc-sand">
          <CardTitle tag="h5">{subject.title}</CardTitle>
          <CardText>{subject.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default SubjectItem;
