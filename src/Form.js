import React from "react";

class Form extends React.Component {
  state = {
    text: "",
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state.text);
    this.setState({ text: "" });
  };

  onChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  render() {
    return (
      <div className="form-head">
        <div className="todo-form">
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              value={this.state.text}
              onChange={this.onChange}
              placeholder="Add new item"
              required
            />
            <button className="plus-btn">+</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;
