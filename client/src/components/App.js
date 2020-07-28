import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./../service/AuthService";

import { Switch, Route, Redirect } from "react-router-dom";

import Index from "./pages/Index";
import Navigation from "./ui/Navbar";
import Login from "./pages/Login";

import Courses from "./pages/Curses";
import Subjects from "./pages/Subjects";
import Teachers from "./pages/Teacher";
import Users from "./pages/Users";
import Messages from "./pages/Messages";
import Events from "./pages/Events";
import Sidebar from "./ui/Sidebar";
import Profile from "./pages/Profile/index";
import UserDetails from "./pages/Users/User-details";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedInUser: null,
      toast: {
        visible: false,
        text: "",
      },
    };
    this.AuthService = new AuthService();
  }

  setTheUser = user => this.setState({ loggedInUser: user }, () => console.log("El estado de App ha cambiado:", this.state))

  fetchUser = () => {
    this.AuthService
      .isLoggedIn()
      .then(response => this.state.loggedInUser === null && this.setState({ loggedInUser: response.data }))
      .catch(err => console.log({ err }))
  }

  handleToast = (visible, text = '') => {
    let toastCopy = { ...this.state.toast }
    toastCopy = { visible, text }
    this.setState({ toast: toastCopy })
  }

  handlerUserChange = (newUserInfor) => {
    this.userServive
      .updateUSer(newUserInfor)
      .then((userSavedFromAPI) =>
        this.setState({ loggedInUser: userSavedFromAPI })
      );
  };
  render() {
    this.fetchUser()
    return (
      <>
        <Navigation setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} handleToast={this.handleToast} />
        <Sidebar />
        <main>
          <Switch>
            <Route exact path="/" render={() => <Index />} />

            <Route path="/profile" render={() =>
              this.state.loggedInUser ? <Profile loggedInUser={this.state.loggedInUser} /> : <Redirect to='/login' />}
            />

            <Route
              exact
              path="/login"
              render={() => (
                <Login
                  onLoginSuccess={(userLogged) => {
                    this.setState({
                      loggedInUser: userLogged,
                      toast: {
                        visible: true,
                        text: `Bienvenido ${userLogged.name}`,
                      },
                    });
                  }}
                />
              )}
            />
            <Route path="/courses" render={() => <Courses />} />
            <Route path="/subjects" render={() => <Subjects />} />
            <Route path="/teachers" render={() => <Teachers />} />
            <Route exact path="/users" render={() => <Users />} />
            <Route
              path="/users/:id"
              render={(props) => <UserDetails {...props} />}
            />

            {/* <Route
              path="/profile"
              render={() => (
                <Profile
                  user={this.state.loggedInUser}
                  onUserChange={(newUserInfor) =>
                    this.handlerUserChange(newUserInfor)
                  }
                />
              )}
            /> */}
            <Route path="/messages" render={() => <Messages />} />
            <Route path="/events" render={() => <Events />} />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
