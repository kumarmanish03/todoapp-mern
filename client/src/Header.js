import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const user = useSelector((store) => store.user);

  return (
    <div className="header">
      <h1>Todo App</h1>
      <nav>
        {user.id === null ? (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <Link to="/logout">Logout</Link>
        )}
      </nav>
    </div>
  );
}
