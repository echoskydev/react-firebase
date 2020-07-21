import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./component/LoginForm";
import Header from "./component/Header";


function App() {
  return (
    <div className="container">
      <Header></Header>
      <LoginForm></LoginForm>
    </div>
  );
}

export default App;
