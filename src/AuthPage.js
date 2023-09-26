import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({ userRole: null });

export function AuthProvider({ children }) {
  const [userRole, setUserRole] = useState("Admin");

  useEffect(() => {
    // Retrieve the user's role from localStorage
    const storedUserRole = localStorage.getItem('role');

    if (storedUserRole) {
      // Set the user's role in the context
      setUserRole(storedUserRole);
    }
  }, []); // This effect should run once, when the component mounts

  return (
    <AuthContext.Provider value={{ userRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
