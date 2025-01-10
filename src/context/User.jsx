import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite/config";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  async function login(email, password) {
    const loggedIn = await account.createEmailPasswordSession(email, password);
    setUser(loggedIn);
    window.location.replace("/admin");
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
  }

  async function init() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);
    } catch (err) {
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider value={{ current: user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
