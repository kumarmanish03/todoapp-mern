import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setUser } from "./userSlice";

const baseURL = "http://localhost:5000/api/users";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const history = useHistory();

  const login = (e) => {
    e.preventDefault();

    fetch(baseURL + "/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "ok") {
          dispatch(setUser(data.user));
          history.push("/");
        }
      });
  };

  return (
    <form onSubmit={login} method="POST">
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

      <button type="submit">Login</button>
    </form>
  );
}
