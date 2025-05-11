import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      setIsSignedIn(true);
      setRole("admin");
    } else if (localStorage.getItem("userToken")) {
      setIsSignedIn(true);
      setRole("user");
    } else {
      setIsSignedIn(false);
      setRole(null);
    }
  }, []);

  const signIn = (roleType, token) => {
    if (roleType === "admin") {
      localStorage.setItem("adminToken", token);
      setRole("admin");
    } else if (roleType === "user") {
      localStorage.setItem("userToken", token);
      setRole("user");
    }
    setIsSignedIn(true);
  };

  const signOut = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("userToken");
    setIsSignedIn(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, role, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
