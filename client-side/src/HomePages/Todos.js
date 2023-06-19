import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const urlPrefix = "http://localhost:3001/";
const selectPresentTodos = ["Serial", "Execution", "Alphabetical", "Random"];

export default function Todos() {
  const [listOfTodos, setListOfTodos] = useState([]);
  const userID = JSON.parse(localStorage["currentUser"]).id;

  useEffect(() => {
    fetch(`${urlPrefix}users/${userID}/todos`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setListOfTodos(data);
      });
  }, []);

  const handleChangeCheckbox = (event) => {
    let todoId = event.target.id;
    let currentTodo = listOfTodos.find((obj) => obj.id == todoId);
    console.log(currentTodo);
    const booleanValue = !currentTodo.completed;
    const integerValue = booleanValue ? 1 : 0;
    currentTodo = { ...currentTodo, completed: integerValue };
    console.log(listOfTodos);
    fetch(`${urlPrefix}users/${userID}/todos/${todoId}`, {
      method: "PUT",
      body: JSON.stringify(currentTodo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("print data ");
        console.log(currentTodo);
        setListOfTodos((prevItems) =>
          prevItems.map((item) => (item.id == currentTodo.id ?  currentTodo: item))
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleChangeDelete = (event) => {
    let todoId = event.target.id;
    let currentTodo = listOfTodos.find((obj) => obj.id == todoId);

    console.log(listOfTodos);
    fetch(`${urlPrefix}users/${userID}/todos/${todoId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setListOfTodos((prevItems) =>
          prevItems.filter((item) => (item.id != currentTodo.id))
        );
      })
      .catch((error) => {
        console.error("Error coud not delete:", error);
      });
  };
  const addItem=(event)=>{
    var input = document.getElementById("myNewItem");
    var valueTitle = input.value;
    let valueId=event.target.id;
    fetch(`${urlPrefix}users/${userID}/todos`, {
      method: "post",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        title: valueTitle
      })
    })
      .then((response) => response.json())
      .then((data) => {
        let newId=data.body.insertId;
        console.log(newId);
        setListOfTodos((prevList) => [...prevList, {
          id:newId,title:valueTitle,completed:0,userID:valueId}]);
      })
      .catch((error) => {
        console.error("Error could not add item:", error);
      });
  }
  const handleSelect = (event) => {
    let present = event.target.value;
    if (present == "Serial") {
      fetch(`${urlPrefix}users/${userID}/todos/id`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListOfTodos(data);
      })
    } else if (present == "Execution") {
      fetch(`${urlPrefix}users/${userID}/todos/completed`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListOfTodos(data);
      })
    } else if (present == "Alphabetical") {
      console.log("in alphabetical");
      fetch(`${urlPrefix}users/${userID}/todos/title`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setListOfTodos(data);
        })
    } else {
      fetch(`${urlPrefix}users/${userID}/todos/rand()`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListOfTodos(data);
      })
    }
  };

  const itemsToElements = listOfTodos.map((item) => (
    <div key={item.id} className="item-container">
      <input
        className="liItem"
        type="checkbox"
        id={item.id}
        checked={item.completed}
        onChange={handleChangeCheckbox}
      />
      <input
        className="liItem"
        type="button"
        value="delete todo"
        id={item.id}
        onClick={handleChangeDelete}
      />
      <label className="checkbox-label" htmlFor={`todo${item.id}`}>
        <span className="title">{item.title}</span>
      </label>
    </div>
  ));
  //orders only in frontend not in query!!!
  let selectElement = (
    <select className="select-option" onChange={handleSelect}>
      {selectPresentTodos.map((currentSelect) => (
        <option key={currentSelect} value={currentSelect}>
          {currentSelect}
        </option>
      ))}
    </select>
  );

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div className="content">
      <h2 c>Your todos:</h2>
      {selectElement}

      {itemsToElements}
      <label>
      add item
        <input id="myNewItem" type="text" />
      </label>
      <input onClick={addItem} type="button" value="Add Item" />
    </div>
  );
}
