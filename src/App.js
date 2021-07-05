import React from "react";
import { Route, Redirect } from "react-router-dom";
import Header from "./Header";
import SignUp from "./SignUp";
import LogIn from "./Login";
import Form from "./Form";
import TodoItem from "./TodoItem";

let url = "https://ntaskadvanced.herokuapp.com/api/";
//let url = "http://localhost:5000/api/";

class App extends React.Component {
  state = {
    todosData: [],
    isLoading: false,
    user: JSON.parse(localStorage.getItem("user")),
    signupErr: "",
    loginErr: "",
  };

  signup = ({ username, password }) => {
    this.setState({ isLoading: true, signupErr: "" });

    fetch(url + "users/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.msg === "ok") {
          this.setState({ user: data.user });
          localStorage.setItem("user", JSON.stringify(data.user));
          this.fetchtodo();
        } else if (data.msg === "USER_EXISTS") {
          this.setState({ signupErr: "Username already taken!" });
        }

        this.setState({ isLoading: false });
      });
  };

  login = ({ username, password }) => {
    this.setState({ isLoading: true, loginErr: "" });

    fetch(url + "users/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.msg === "ok") {
          if (data.user == null) {
            this.setState({ loginErr: "Invalid credentials!" });
          } else {
            this.setState({ user: data.user });
            localStorage.setItem("user", JSON.stringify(data.user));
            this.fetchtodo();
          }
        }
        this.setState({ isLoading: false });
      });
  };

  logout = () => {
    this.setState({ user: null });
    localStorage.removeItem("user");
  };

  fetchtodo = () => {
    this.setState({ isLoading: true });

    fetch(url + "todos/user/" + this.state.user.id)
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "ok") {
          this.setState({ todosData: data.todos, isLoading: false }, () => {
            console.log("Todos fetched from API...");
          });
        }
      });
  };

  componentDidMount() {
    if (this.state.user !== null) {
      this.fetchtodo();
    }
  }

  addTodo = (todo) => {
    this.setState({ isLoading: true });

    fetch(url + "todos/user/" + this.state.user.id, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ todo: todo }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        if (data.msg === "ok") {
          this.fetchtodo();
        }
      });
  };

  delTodo = (id) => {
    this.setState({ isLoading: true });

    fetch(url + "todos/" + id, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => this.fetchtodo());
  };

  toggleTodo = (id) => {
    this.setState({ isLoading: true });

    fetch(url + "todos/" + id + "/completed", { method: "PUT" })
      .then((res) => res.json())
      .then((data) => this.fetchtodo());
  };

  render() {
    const todoItems = this.state.todosData.map((todo) => (
      <TodoItem
        key={todo.id}
        item={todo}
        delTodo={this.delTodo}
        toggleTodo={this.toggleTodo}
      />
    ));

    return (
      <div>
        <Header user={this.state.user} logout={this.logout} />

        <Route path="/signup">
          <SignUp
            user={this.state.user}
            signup={this.signup}
            error={this.state.signupErr}
          />
        </Route>

        <Route path="/login">
          <LogIn
            user={this.state.user}
            login={this.login}
            error={this.state.loginErr}
          />
        </Route>

        <Route exact path="/">
          {this.state.user === null ? (
            <Redirect to="/signup" />
          ) : (
            <>
              <Form addTodo={this.addTodo} />
              <div className="todo-list">{todoItems}</div>
            </>
          )}
        </Route>

        {this.state.isLoading && (
          <div className="app-loading">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>
    );
  }
}

export default App;
