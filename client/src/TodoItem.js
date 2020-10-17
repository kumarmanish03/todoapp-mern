import React from "react";

function TodoItem(props) {
  const delTodo = (e) => {
    e.preventDefault();
    props.delTodo(props.item.id);
  };

  let styles = {
    textDecoration: props.item.completed ? "line-through" : "none",
  };

  const toggleTodo = () => {
    props.toggleTodo(props.item.id);
  };

  return (
    <div className="todo-item">
      <div className="todoi">
        <input
          type="checkbox"
          defaultChecked={props.item.completed}
          onChange={toggleTodo}
        ></input>
        <label style={styles}>{props.item.text}</label>
      </div>
      <div>
        <button onClick={delTodo}>x</button>
      </div>
    </div>
  );
}

export default TodoItem;
