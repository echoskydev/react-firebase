import React, { PureComponent } from "react";
class User extends PureComponent {
  styles = {
    container: {
      display: "flex",
      flex: 1,
      flexDirection: "row",
      minHeight: 20,
      alignItem: "center",
      justifyContent: "center",
    },
    title: {
      color: "blue",
    },
    age: {
      color: "red",
    },
  };

  editHandler = (id) => {
    const obj = {
      userName: "#" + Math.floor(Math.random() * 9999).toString() + "#",
      passWord: "#" + Math.floor(Math.random() * 9999).toString() + "#",
      name: "#" + Math.floor(Math.random() * 9999).toString() + "#",
      age: Math.ceil(Math.random() * 99).toString(),
    };
    this.props.edit(id, obj);
  };

  render() {
    return (
      <div style={this.styles.container}>
        <div style={this.styles.list}>id: {this.props.data.id}</div>
        <div style={{ ...this.styles.list, ...this.styles.title }}>
          {" "}
          {this.props.data.userName ? this.props.data.userName : "No username"}
        </div>
        <div style={{ ...this.styles.list, ...this.styles.title }}>
          {" "}
          {this.props.data.passWord ? this.props.data.passWord : "No pass"}
        </div>
        <div style={{ ...this.styles.list, ...this.styles.title }}>
          {" "}
          {this.props.data.name ? this.props.data.name : "No name"}
        </div>
        <div style={{ ...this.styles.list, ...this.styles.age }}>
          {" "}
          {this.props.data.age ? this.props.data.age : "No age"}
        </div>
        <div>
          <button onClick={this.editHandler.bind(this, this.props.data.id)}>
            edit
          </button>
        </div>
        <div>
          <button onClick={this.props.delete}>del</button>
        </div>
      </div>
    );
  }
}

export default User;
