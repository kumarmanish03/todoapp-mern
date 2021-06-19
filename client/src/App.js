import React from "react";
//import uuid from "uuid";
import TodoItem from "./TodoItem";
import Form from "./Form";
//import todosData from "../../todosData";

// const url = "https://my-todos-app.herokuapp.com/api/todos/";
const url = "http://localhost:5000/api/todos/";

class App extends React.Component {
  state = {
    todosData: [],
  };

  fetchtodo = () => {
    fetch(url)
      .then((res) => res.json())
      .then((todos) =>
        this.setState(
          {
            todosData: todos.todos,
          },
          () => console.log("Todos fetched from API...")
        )
      );
  };

  componentDidMount() {
    this.fetchtodo();
  }

  addTodo = (todo) => {
    fetch(url, {
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
    fetch(url + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        this.fetchtodo();
      });
  };

  toggleTodo = (id) => {
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
        <Form addTodo={this.addTodo} />
        <div className="todo-list">{todoItems}</div>
      </div>
    );
  }
}

export default App;
