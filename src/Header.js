import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <header className="header">
      <h1>Todo App</h1>

      <nav>
        {props.user === null ? (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Log In</Link>
          </>
        ) : (
          <button onClick={props.logout}>Log Out</button>
        )}
      </nav>
    </header>
  );
}
