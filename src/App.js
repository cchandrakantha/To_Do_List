import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [infoIndex, setInfoIndex] = useState(null); // State to manage info visibility

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    const now = new Date();
    const timestamp = now.toLocaleString(); // You can customize the format if needed
    setTodos([...todos, { text: newTodo, completed: false, timestamp }]);
    setNewTodo('');
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    setInfoIndex(null); // Hide info when deleting
  };

  const handleInfoClick = (index) => {
    setInfoIndex(infoIndex === index ? null : index); // Toggle info visibility
  };

  return (
    <div className="app-container">
      <div className="mobile-frame">
        <div className="todo-container">
          <h1 className="title">To-Do List</h1>
          <div className="input-container">
            <input
              type="text"
              className="todo-input"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task"
            />
            <button onClick={addTodo} className="add-button">
              Add
            </button>
          </div>
        </div>
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <span onClick={() => toggleTodo(index)} className="todo-text">
                {todo.text}
              </span>
              <div className="button-group">
                <button onClick={() => deleteTodo(index)} className="delete-button">
                  Delete
                </button>
                <button onClick={() => handleInfoClick(index)} className="info-button">
                  &#9432; {/* Info icon (Unicode character for "information" */}
                </button>
              </div>
              {infoIndex === index && (
                <div className="info-text">Added on: {todo.timestamp}</div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
