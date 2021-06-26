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

  const getDate = (str) => {
    const date = new Date(str);
    return date.toDateString();
  };

  return (
    <div className="todo-item">
      <div className="todoi">
        <input
          type="checkbox"
          defaultChecked={props.item.completed}
          onChange={toggleTodo}
        ></input>
        <label style={styles}>{props.item.todo}</label>
      </div>
      <div className="date">{getDate(props.item.date_added)}</div>
      <div>
        <button onClick={delTodo} className="btn">
          <i className="fa fa-trash"></i>
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
