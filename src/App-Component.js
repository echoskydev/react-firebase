import React, { useState, useEffect } from "react";
import firestore from "./database/firebase";
import User from "./component/User";
import Form from "./component/Form";

function App() {
  ///////// realtime data
  const [data, setData] = useState([]);
  useEffect(() => {
    const userRef = firestore.collection("users");
    const query = userRef.orderBy("userName", "asc");
    const unsubscribe = query.onSnapshot(
      (snapshot) => {
        let tempDataArray = [];
        snapshot.forEach((doc) => {
          if (doc.exists) {
            tempDataArray = [
              ...tempDataArray,
              {
                id: doc.id,
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
    return () => {
      unsubscribe();
    };
  }, []);

  const style = {
    header: {
      display: "flex",
      flexDirection: "row",
      minHeight: 100,
      alignItem: "center",
      justifyContent: "center",
    },
  };

  const addUserHandler = (obj) => {
    const ref = firestore.collection("users");
    ref
      .add(obj)
      .then(() => {
        console.log("add successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteHandler = (id) => {
    const ref = firestore.collection("users");
    ref
      .doc(id)
      .delete()
      .then(() => {
        console.log("deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editHandler = (id, obj) => {
    console.log("obj", id);
    const ref = firestore.collection("users");
    ref
      .doc(id)
      .set(obj)
      .then(() => {
        console.log("updated");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //////////// load more

  return (
    <div className="App">
      <div>

      </div>
      <div style={style.header}>
        <Form addData={addUserHandler}></Form>
      </div>
      <div style={style.header}>
        <div style={{ width: "80%" }}>
          {data.map((item, index) => {
            return (
              <div key={index}>
                <User
                  data={item}
                  edit={(id, obj) => editHandler(id, obj)}
                  delete={() => deleteHandler(item.id)}
                ></User>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
