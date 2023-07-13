import React, { useState } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const handleInputChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setTodos((prevTodos) => [...prevTodos, inputValue]);
      setInputValue("");
    }
  };
  
  const handleDelete = (index) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
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
            <i className="fas fa-trash" onClick={handleDelete.bind(null, index)}></i>
          </li>
        ))}
      </ul>
      <div>{todos.length} tasks</div>
    </div>
  );
};

export default Home;