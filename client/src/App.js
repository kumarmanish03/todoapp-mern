import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { setUser, resetUser } from "./userSlice";
import TodoItem from "./TodoItem";
import Form from "./Form";
import Header from "./Header";
import SignUp from "./SignUp";
import Login from "./Login";
import Logout from "./Logout";

// const url = "https://my-todos-app.herokuapp.com/api/todos/";
const url = "http://localhost:5000/api/todos/";

class App extends React.Component {
  state = {
    todosData: [],
    isLoading: false,
    user: { id: null },
  };

  fetchtodo = () => {
    this.setState({ isLoading: true });

    fetch(url + "user/" + this.state.user.id)
      .then((res) => res.json())
      .then((todos) => {
        this.setState(
          {
            todosData: todos.todos,
          },
          () => console.log("Todos fetched from API...")
        );
        this.setState({ isLoading: false });
      });
  };

  componentDidMount() {
    this.setState({
      user: this.props.user,
    });

    if (this.props.user.id !== null) {
      this.fetchtodo();
    }
  }

  addTodo = (todo) => {
    this.setState({ isLoading: true });

    fetch(url + "user/" + this.state.user.id, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        todo: todo,
      }),
    })
      .then((res) => res.json())
      .then((data) => this.fetchtodo());
  };

  delTodo = (id) => {
    this.setState({ isLoading: true });

    fetch(url + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        this.fetchtodo();
      });
  };

  toggleTodo = (id) => {
    this.setState({ isLoading: true });

    fetch(url + id + "/completed", {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        this.fetchtodo();
      });
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
        <Header />

        <Route path="/signup">
          {this.state.user.id !== null ? <Redirect to="/" /> : <SignUp />}
        </Route>

        <Route path="/login">
          {this.state.user.id !== null ? <Redirect to="/" /> : <Login />}
        </Route>

        <Route path="/logout">
          <Logout />
        </Route>

        <Route exact path="/">
          {this.state.user.id === null ? (
            <Redirect to="/signup" />
          ) : (
            <>
              <Form addTodo={this.addTodo} />
              <div className="todo-list">
                {this.state.isLoading ? "Loading..." : todoItems}
              </div>
            </>
          )}
        </Route>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({ user: store.user });

const mapDispatchToProps = { setUser, resetUser };

export default connect(mapStateToProps, mapDispatchToProps)(App);
