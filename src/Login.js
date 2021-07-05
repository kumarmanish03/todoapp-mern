import React, { useState } from "react";
import { Redirect } from "react-router-dom";

export default function LogIn(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.login({ username, password });
  };

  if (props.user !== null) {
    return <Redirect to="/" />;
  }

  return (
    <div className="cont">
      <form id="login-form" className="user-form" onSubmit={handleSubmit}>
        <h2>Login Here</h2>

        {props.error && <div className="error-card">{props.error}</div>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
        />

        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
