import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase-config';
import { DatePickerInput } from '@mantine/dates'; // Import DatePickerInput from Mantine
import dayjs from 'dayjs';
import TodoForm from './TodoForm';
import '../theme/Calendar.css';
import { MantineProvider } from '@mantine/core';

const CalendarView = () =>{
    return(
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <CalendarViewProvider />
        </MantineProvider>
    )
}

const CalendarViewProvider = () => {
  const [todos, setTodos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

  useEffect(() => {
    const q = query(collection(db, 'todos'), where('date', '==', selectedDate));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todoData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setTodos(todoData);
    });
    return () => unsubscribe();
  }, [selectedDate]);

  return (
    <div className="calendar-view">
      <h2>Todos for {selectedDate}</h2>
      <div className="date-picker-container">
        <DatePickerInput
          value={new Date(selectedDate)}
          onChange={(date) => setSelectedDate(dayjs(date).format('YYYY-MM-DD'))}
          placeholder="Select a date"
          label="Pick a date to view todos"
          size="md"
          className="date-picker-input"
        />
      </div>
      <TodoForm currentDate={selectedDate} />
      <div className="todos-list">
        {todos.length ? (
          <ul>
            {todos.map((todo) => (
              <li className="todo-item" key={todo.id}>
                <span>{todo.title}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-todos-message">No todos for today</p>
        )}
      </div>
    </div>
  );
};

export default CalendarView;

