import React, { createContext, useState } from "react";

export const SubjectContext = createContext();

const SubjectContextProvider = (props) => {
  const [chosenSubject, setChosenSubject] = useState("");
  const [chosenThread, setChosenThread] = useState("");
  const [subjects, setSubjects] = useState("");

  const fetchSubjects = async () => {
    let result = await fetch("/rest/subjects");
    result = await result.json();
    setSubjects(result);
  };

  const values = {
    subjects,
    chosenSubject,
    setChosenSubject,
    fetchSubjects,
    chosenThread,
    setChosenThread,
  };

  return (
    <SubjectContext.Provider value={values}>
      {props.children}
    </SubjectContext.Provider>
  );
};
export default SubjectContextProvider;
