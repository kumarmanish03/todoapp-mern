import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <header className="header">
      <div className="cont">
        <h1>nTask Advanced</h1>

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
      </div>
    </header>
  );
}
