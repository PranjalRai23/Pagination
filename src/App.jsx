import React from 'react'
import './App.css'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";


function App() {
  
  const [todos, setTodos] = useState([]);
  const [todoPerPage, setTodoPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  let numberOfPages = Math.ceil(todos.length/todoPerPage);

  const pageArray = [...Array(numberOfPages+1).keys()].slice(1);

  const indexOfLastPage = currentPage * todoPerPage;
  const indexOfFirstPage = indexOfLastPage - todoPerPage;

  const visibleTodos = todos.slice(indexOfFirstPage, indexOfLastPage);
  

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTodos(data);
        console.log(data);
      })
  }, [])

  return (
    <div>
      <div>
        <select onChange={(e) => setTodoPerPage(e.target.value)}>
          <option>10</option>
          <option>20</option>
          <option>40</option>
        </select>
      </div>
      {visibleTodos.map(todo => <p key={todo.id}>{todo.title}</p>)}
      <span onClick={()=> currentPage!=1 && setCurrentPage(currentPage-1)} style={{cursor: "pointer"}}>prev</span>
      <p>{pageArray.map(page => <span key={page} onClick={() => setCurrentPage(page)} style={{cursor: "pointer"}} className={currentPage==page ? "active" : ""}>{page} | </span>)}</p>
      <span onClick={()=> currentPage!=pageArray.length && setCurrentPage(currentPage+1) } style={{cursor: "pointer"}}>next</span>
    </div>
  )
}

export default App
