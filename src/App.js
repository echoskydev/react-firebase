import React, { useState } from "react";
import firestore from "./database/firebase";

function App() {

  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const addUserHandler = (obj) => {
    const ref = firestore.collection("users");
    ref
      .add(obj)
      .then(() => {
        console.log("add successfully.");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const obj = {
      userName: userName,
      passWord: passWord,
      name: name,
      age: age,
    };

    setUserName("");
    setPassWord("");
    setName("");
    setAge("");

    addUserHandler(obj);
  };

  return (
    <div className="App">
      <div style={{ width: "80%", marginLeft: 20 }}>
        <form onSubmit={submitHandler}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Password</label>
            <input
              type="text"
              value={passWord}
              onChange={(e) => setPassWord(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Age</label>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            ></input>
          </div>
          <button type="submit"> Add</button>
        </form>
      </div>
    </div>
  );
}

export default App;
