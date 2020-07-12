import React, { useState, useEffect } from "react";
import firestore from "./database/firebase";

function App() {

  ///////// realtime data
  const [data, setData] = useState([]);
  useEffect(() => {
    const userRef = firestore.collection("users");
    userRef.onSnapshot(
      (snapshot) => {
        let tempDataArray = [];
        snapshot.forEach((doc) => {
          if (doc.exists) {
            tempDataArray = [
              ...tempDataArray,
              {
                userName: doc.data().userName,
                passWord: doc.data().passWord,
                name: doc.data().name,
                age: doc.data().age,
              },
            ];
          }
        });
        setData((oldDataArray) => tempDataArray);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  //////////// load more
  const [userLists, setUserLists] = useState([]);
  const [currentCursor, setCurrentCursor] = useState(null);
  useEffect(() => {
    const firstPageRef = firestore
      .collection("users")
      .orderBy("userName", "asc")
      .limit(3);

    firstPageRef.get().then((querySnapshot) => {
      let tempLists = [];
      querySnapshot.docs.forEach((doc) => {
        if (doc.exists) {
          const currentUser = {
            userName: doc.data().userName,
            passWord: doc.data().passWord,
            name: doc.data().name,
            age: doc.data().age,
          };

          tempLists = [...tempLists, currentUser];
        }
      });
      setUserLists((prv) => tempLists);
      const currentLength = querySnapshot.docs.length;
      const currentCursorFromFirstPage = querySnapshot.docs[currentLength - 1];
      setCurrentCursor(currentCursorFromFirstPage);
    });
  }, []);

  const onMoreUser = () => {
    const nextPageRef = firestore
      .collection("users")
      .orderBy("userName", "asc")
      .limit(3);

    nextPageRef.get().then((querySnapshot) => {
      const currentLength = querySnapshot.docs.length;
      if (!currentLength) {
        return;
      }

      const query = nextPageRef.startAfter(currentCursor);
      query.get().then((querySnapshot) => {
        let tempNewArray = [];
        querySnapshot.docs.forEach((doc) => {
          if (doc.exists) {
            tempNewArray = [
              ...tempNewArray,
              {
                userName: doc.data().userName,
                passWord: doc.data().passWord,
                name: doc.data().name,
                age: doc.data().age,
              },
            ];
          }
        });
        setUserLists([...userLists, ...tempNewArray]);
        const currentCursorForNextPage = querySnapshot.docs[currentLength - 1];
        setCurrentCursor(currentCursorForNextPage);
      });
    });
  };

  ///////////////// create data
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
      <div>Create Data</div>
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

      <div style={{ width: "80%", marginLeft: 20 }}>
        <div>การแสดงข้อมูลแบบ load more</div>
        <ul>
          {userLists.map((user, index) => {
            return (
              <li key={index}>
                #username: {user.userName}: name: {user.name}: age: {user.age}
              </li>
            );
          })}
        </ul>

        <hr />
        {currentCursor ? (
          <button onClick={onMoreUser}>More User...</button>
        ) : (
          <div>No more user</div>
        )}
      </div>

      {/* realtime get data  */}
      <div style={{ width: "80%", marginLeft: 20 }}>
        <div>การใช้งานข้อมูลแบบเรียลทาม</div>
        <table>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr
                  key={index}
                  style={
                    index % 2 === 0 ? { backgroundColor: "lightgray" } : null
                  }
                >
                  <td>{item.userName}</td>
                  <td>{item.passWord}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
