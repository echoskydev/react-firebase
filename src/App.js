import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./component/LoginForm";
import Header from "./component/Header";
import Storage from "./component/Storage";

function App() {
  return (
    <div className="container">
      <Header></Header>
      <LoginForm></LoginForm>
      <Storage></Storage>
    </div>
  );
}

export default App;
