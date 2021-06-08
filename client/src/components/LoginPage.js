import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { addUser } from "../services/Users";
import { withAlert } from "react-alert";

class LoginPage extends React.Component {
  state = {
    redirectToChatPage: false,
    userId: "",
    userName: "",
    error: "",
  };

  onUserUpdate = (e) => {
    this.setState({ userName: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let currentComponent = this;
    const isUserProvided = this.state.userName && this.state.userName !== "";
    if (isUserProvided) {
      const user = {
        id: "0",
        name: this.state.userName,
        isTyping: false,
      };
      addUser(user)
        .then((data) => {
          if (data.hasOwnProperty("name")) {
            currentComponent.setState({
              redirectToChatPage: true,
              userId: data.id,
            });
          } else {
            this.props.alert.show("Nombre de Usuario invalido");
          }
        })
        .catch((error) => console.error(error));
    } else {
      this.setState({ error: "Por favor ingresa un nombre de usuario" });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToChatPage && (
          <Redirect
            to={{
              pathname: "/chat",
              state: {
                userName: this.state.userName,
                userId: this.state.userId,
              },
            }}
          />
        )}
        <div className="wrapper">
          <div className="form">
            <h1 className="title">Serber Chat</h1>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                value={this.state.userName}
                onChange={(e) => this.setState({ userName: e.target.value })}
                className="input"
                placeholder="Nombre de Usuario"
                required
              />
              <div align="center">
                <button type="submit" className="button">
                  <span>¡Charlemos juntos!</span>
                </button>
              </div>
            </form>
            <h1>{this.state.error}</h1>
          </div>
        </div>
      </>
    );
  }
}

export default withAlert()(withRouter(LoginPage));
