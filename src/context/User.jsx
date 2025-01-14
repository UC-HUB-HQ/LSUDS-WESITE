import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite/config";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function login(email, password) {
    await account.createEmailPasswordSession(email, password);
    const loggedIn = await account.get();
    setUser(loggedIn);
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
    navigate("/signin")
  }

  async function init() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);
    } catch (err) {
      setUser(null);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    init();
  }, []);



  const context = {
    currentUser: user,
    login,
    logout,
    loading,
  };


  return (
    <UserContext.Provider value={context}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
