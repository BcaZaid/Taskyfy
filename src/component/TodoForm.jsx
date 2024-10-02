import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const TodoForm = ({ currentDate }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;

    try {
      await addDoc(collection(db, 'todos'), {
        title,
        date: currentDate,
      });
      setTitle(''); // Clear the input after adding
    } catch (error) {
      console.error('Error adding todo: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New Todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
