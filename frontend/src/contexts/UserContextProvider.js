import React, { createContext, useEffect, useState } from "react";


export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    console.log('In fetch user');
    let res = await fetch("/auth/whoami");
   
    try {
      if (res.ok) {
        res = await res.json();
        setUser(res);
      } else {
        setUser(null);
      }
    } catch {}
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]); 
  
  const values = {
    user,
    fetchUser,
    setUser,
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};
export default UserContextProvider;
