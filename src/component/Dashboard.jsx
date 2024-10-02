import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase-config';
import dayjs from 'dayjs';
import TodoForm from './TodoForm';
import '../theme/Dashboard.css'; // Import the component-specific CSS file

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const currentDate = dayjs().format('DD/MM/YYYY');

  useEffect(() => {
    const q = query(collection(db, 'todos'), where('date', '==', currentDate));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todoData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setTodos(todoData);
    });
    return () => unsubscribe();
  }, [currentDate]);

  return (
    <div className="dashboard-container">
      <h2> Todos for {currentDate}</h2>
      <TodoForm currentDate={currentDate} />
      {todos.length ? (
        <ul>
          {todos.map((todo) => (
            <li className="todo-item" key={todo.id}>
              <span>{todo.title}</span>
              {/* Add edit and delete options here */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No todos for today</p>
      )}
    </div>
  );
};

export default Dashboard;
