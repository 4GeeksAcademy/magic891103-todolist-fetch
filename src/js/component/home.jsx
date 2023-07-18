import React, { useState, useEffect } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const username = "magic891103";
  const apiUrl = "https://fake-todo-list-52f9a4ed80ce.herokuapp.com/";

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    fetch(`${apiUrl}todos/user/${username}`)
      .then((response) => response.json())
      .then((data) => setTodos(data.map((item) => item.label)))
      .catch((error) => console.error(error));
  };

  const handleInputChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const addTodo = () => {
    const newTodo = { label: inputValue, done: false };
    const updatedTodos = [...todos, newTodo];

    fetch(`${apiUrl}todos/user/${username}`, {
      method: "PUT",
      body: JSON.stringify(updatedTodos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        setTodos(updatedTodos);
        setInputValue("");
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = () => {
    fetch(`${apiUrl}todos/user/${username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => setTodos([]))
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <h1>todos</h1>
      <ul>
        <li>
          <input
            type="text"
            placeholder="What do you need to do?"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </li>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}{" "}
            <i className="fas fa-trash" onClick={handleDelete}></i>
          </li>
        ))}
      </ul>
      <div>{todos.length} tasks</div>
      <button onClick={handleDelete}>Clean all tasks</button>
    </div>
  );
};

export default Home;