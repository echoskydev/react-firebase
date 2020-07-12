import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "./database/firebase";

export default function SignIn() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const authUnsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => {
      authUnsubscribe();
    };
  }, []);

  const googleLoginHandler = () => {
    auth.signInWithPopup(googleProvider);
  };

  const signOutHandler = () => {
    auth
      .signOut()
      .then(() => {
        console.log("logout ok :>> ");
      })
      .catch((err) => {
        console.log("logout not ok :>> ", err);
      });
  };

  return (
    <div>
      {!user ? (
        <button onClick={googleLoginHandler}>Google Login</button>
      ) : (
        <button onClick={signOutHandler}>Logout</button>
      )}
    </div>
  );
}
