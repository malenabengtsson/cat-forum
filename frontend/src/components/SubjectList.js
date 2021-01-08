import React, { useEffect, useContext } from "react";
import SubjectItem from "./SubjectItem";
import { SubjectContext } from "../contexts/SubjectContextProvider";

const SubjectList = () => {
  const { fetchSubjects, subjects } = useContext(SubjectContext);

  useEffect(() => {
    fetchSubjects();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="m-4">
      {subjects &&
        subjects.map((subject, i) => {
          return <SubjectItem subject={subject} key={i} />;
        })}
    </div>
  );
};
export default SubjectList;
