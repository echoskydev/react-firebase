import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./component/LoginForm";
import Header from "./component/Header";
import Storage from "./component/Storage";

function App() {
  return (
    <div className="container">
      <Header></Header>
      <div className="row mt-4 bg-light p-5">
        <div className="col-sm-12">
          <h4>Firebase Login (Email & Password)</h4>
        </div>
        <LoginForm></LoginForm>
      </div>
      <div className="row mt-4 bg-light p-5 mb-5">
        <div className="col-sm-12">
          <h4>Firebase Storage</h4>
        </div>
        <Storage></Storage>
      </div>
    </div>
  );
}

export default App;
