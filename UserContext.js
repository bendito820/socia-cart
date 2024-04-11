import { createContext, useState } from "react";

const UserType = createContext();

const UserConstext = ({ children }) => {
  const [userId, setUserId] = useState("");
  return (
    <UserType.Provider value={{ userId, setUserId }}>
      {children}
    </UserType.Provider>
  );
};

export { UserType, UserConstext };
