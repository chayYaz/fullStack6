import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
export default function Home() {
  const userID = JSON.parse(localStorage["currentUser"]).id;
  return (
    <header>
      <nav>
        <Link to={`info`}>INFO</Link>

        <Link to={`posts`}>POSTS</Link>

        <Link to={`todos`}>TODOS</Link>

        <Link
          to="/"
          className="link"
          onClick={() => localStorage.removeItem("currentUser")}
        >
          logout
        </Link>
      </nav>

      <Outlet />
    </header>
  );
}
