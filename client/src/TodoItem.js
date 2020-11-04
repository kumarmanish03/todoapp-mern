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

  const date = props.item.date == null ? "10:58 17/09/2020" : props.item.date;

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
      <div className="date">{date}</div>
      <div>
        <button onClick={delTodo} className="btn">
          <i class="fa fa-trash"></i>
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
