import React, { useState } from "react";
import { Redirect } from "react-router-dom";

export default function SignUp(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (/^\w{5,30}$/.test(username)) {
      setError("");
      props.signup({ username, password });
    } else {
      setError("Username must contain alphanumeric characters or underscore!");
    }
  };

  if (props.user !== null) {
    return <Redirect to="/" />;
  }

  return (
    <div className="cont">
      <form id="signup-form" className="user-form" onSubmit={handleSubmit}>
        <h2>Signup Here</h2>

        {error && <div className="error-card">{error}</div>}

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
    </div>
  );
}
