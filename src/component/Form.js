import React, { useState } from "react";
const Form = ({ addData }) => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const styles = {
    container: {
      alignSelf: "column",
    },
    list: {
      marginTop: "10",
      borderColor: "gray",
      borderWidth: 1,
      textAlign: "left",
    },
    title: {
      color: "blue",
    },
    age: {
      color: "red",
    },
  };

  return (
    <div style={styles.container}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addData({ userName, passWord, name, age });
        }}
      >
        <div>
          <label>Username</label>
          <input
            type="text"
            value={userName}
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            value={passWord}
            placeholder="Password"
            onChange={(e) => setPassWord(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Age</label>
          <input
            type="text"
            value={age}
            placeholder="Age"
            onChange={(e) => setAge(e.target.value)}
          ></input>
        </div>
        <button type="submit"> Add</button>
      </form>
    </div>
  );
};

export default Form;
