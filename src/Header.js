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

// Line 17:13:  The href attribute is required for an anchor to be keyboard accessible. Provide a valid, navigable address as the href value. If you cannot provide an href, but still need the element to resemble a link, use a button and change it with appropriate styles. Learn more: https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md  jsx-a11y/anchor-is-valid

// Search for the keywords to learn more about each warning.
