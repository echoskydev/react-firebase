import React, { useState, useEffect } from "react";
import firestore from "./database/firebase";
import User from "./component/User";
import Form from "./component/Form";
import SignIn from "./SignIn";

function App() {
  return (
    <div className="App">
      <div>
        <SignIn></SignIn>
      </div>

    </div>
  );
}

export default App;
