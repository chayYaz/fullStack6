import "./App.css";

import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";

import Login from "./Login";
import Register from "./Register";
import Info from "./HomePages/Info";
import Todos from "./HomePages/Todos";
import Posts from "./HomePages/Posts";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Login />} />
        <Route path="/register" index element={<Register />} />
        <Route path="/users/:username/home" element={<Home />}>
          <Route path="info" element={<Info />} />
          <Route path="todos" element={<Todos />} />
          <Route path="posts" element={<Posts />} />
          {/* <Route path="posts">

              <Route index element={<Posts />} />

              <Route path=":postId/comments" element={<Comments />} />

            </Route>



            <Route path="logout" element={<Logout />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
