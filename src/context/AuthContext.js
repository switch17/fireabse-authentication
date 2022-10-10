import React, { useState, useEffect, createContext, useContext } from "react";

// importing firebase auth
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";

// Creating Context
const AuthContext = createContext();

// using Context
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  // state to keep track of current user
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  //   signing up the user using auth
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   sign uin
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // sign out
  const logOut = () => {
    return signOut(auth);
  };

  //   reset password fn
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // update email
  const updateUserEmail = (email) => {
    return updateEmail(auth.currentUser, email);
  };

  // Update Password
  const updateUserPassword = (password) => {
    return updatePassword(auth.currentUser, password);
  };

  //   setting up the user only on state change
  useEffect(() => {
    //   firebase returns promise when user is set
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // setting the user as current user
      setCurrentUser(user);
      setIsLoading(false);
    });

    // onAuthStateChanged returns a method that helps to unsubscribe
    // unsubscribing from onAuthStateChanged event whenever component is unmounted
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    signIn,
    logOut,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
