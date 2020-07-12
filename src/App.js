import React, { useState, useEffect } from "react";
import {firestore, auth} from "./database/firebase";
import User from "./component/User";
import Form from "./component/Form";
import SignIn from "./SignIn";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const authUnsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      authUnsubscribe();
    };
  }, [user]);
  return (
    <div className="App">
      <div>
        <SignIn></SignIn>
      </div>
      <div>
        {user ? (
          <div>
            <hr />
            <div>UID: {user.uid}</div>
            <div>Name: {user.displayName}</div>

            <div>email: {user.email}</div>
            <div>
              <img
                src={user.photoURL}
                alt="User Photo"
                style={{ width: 50, height: 50 }}
              ></img>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default App;
