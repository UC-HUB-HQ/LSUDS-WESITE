import { createContext } from "react";
export const AdminContext = createContext(null);
const AdminProvider = ({children}) => {

    
    contextValue = {
        dummy: "Hey dave"
    }

    return (
      <AdminContext.Provider value={contextValue}>
        {children}
      </AdminContext.Provider>
    );
}

export default AdminProvider