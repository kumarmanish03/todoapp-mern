import React from "react";
//import uuid from "uuid";
import TodoItem from "./TodoItem";
import Form from "./Form";
//import todosData from "../../todosData";

class App extends React.Component {
  state = {
    todosData: [],
  };

  componentDidMount() {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((todos) =>
        this.setState(
          {
            todosData: todos,
          },
          () => console.log("Todos fetched from API...")
        )
      );
  }

  addTodo = (todo) => {
    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        text: todo,
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          todosData: data,
        })
      );
  };

  delTodo = (id) => {
    fetch("/api/todos/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          todosData: data.todosData,
        });
      });
  };

  toggleTodo = (id) => {
    this.setState({
      todosData: this.state.todosData.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
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
