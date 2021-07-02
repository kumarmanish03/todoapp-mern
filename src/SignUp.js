import React, { useState } from "react";
import { Redirect } from "react-router-dom";

export default function SignUp(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.signup({ username, password });
  };

  if (props.user !== null) {
    return <Redirect to="/" />;
  }

  return (
    <form id="signup-form" onSubmit={handleSubmit}>
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

      <button type="submit">Sign Up</button>
    </form>
  );
}
