// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebase/firebase";
import { fetchUserData } from "../api/users";

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Fetch additional user data here if needed
        if (!currentUser?.basicInformation) {
          const userResponse = await fetchUserData(user.uid);
          setCurrentUser({ user, ...userResponse });
        } else {
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
