import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

//const { currentVan } = useOutletContext()

const urlPrefix = "http://localhost:3001/";
export default function Posts() {
  const userName = JSON.parse(localStorage["currentUser"]).userName;
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetch(`${urlPrefix}users/${userName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("got it");
        console.log(data);
        setUserData({ ...data[0] });
        console.log(userData);
      });
  }, []);
  const showUserData = (
    <div>
      <div>
        <strong>ID:</strong>
        {userData.id}
      </div>
      <div>
        <strong>Username:</strong>
        {userData.username}
      </div>
      <div>
        <strong>Email:</strong>
        {userData.email}
      </div>
      {/* <div>{JSON.stringify(userData.address)}</div> */}
    </div>
  );

  return (
    <section className="content">
      <h2>Your Details</h2>
      <div>
        {userData !== {} ? (
          <section>{showUserData}</section>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </section>
  );
}
