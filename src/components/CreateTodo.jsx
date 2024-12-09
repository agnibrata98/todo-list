import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateTodo = () => {
  const [inputTodo, setInputTodo] = useState({
    todoName: '',
    userId: '',
    isCompleted: false,
  });

  // State to hold the list of todos
  const [todos, setTodos] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Send the new todo to the API using axios
    axios({
      method: 'POST',
      url: 'https://dummyjson.com/todos/add',
      headers: { 'Content-Type': 'application/json' },
      data: {
        todo: inputTodo.todoName,         // Send the todoName from inputTodo
        completed: inputTodo.isCompleted, // Send the isCompleted value
        userId: inputTodo.userId,         // Send the userId
      },
    })
    .then((res) => {
      console.log(res.data);
      alert('Todo created successfully');
      
      // Update the local state with the new todo
      setTodos(prevTodos => [...prevTodos, inputTodo]);
  
      // Navigate or handle next steps
      navigate('/');
    })
    .catch((err) => {
      console.error(err);
      alert('There was an error creating the todo.');
    });
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxWidth: '400px',
            margin: '0 auto',
            padding: 3,
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Create Todo
          </Typography>

          <TextField
            label="Todo Name"
            variant="outlined"
            name="todoName"
            onChange={e => setInputTodo({ ...inputTodo, todoName: e.target.value })}
            fullWidth
            required
          />

          <TextField
            label="User ID"
            variant="outlined"
            name="userId"
            onChange={e => setInputTodo({ ...inputTodo, userId: e.target.value })}
            fullWidth
            required
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={inputTodo.isCompleted}
                onChange={e => setInputTodo({ ...inputTodo, isCompleted: e.target.checked })}
                name="isCompleted"
                color="primary"
              />
            }
            label="Is Completed"
          />

          <Button variant="contained" color="primary" type="submit" fullWidth>
            Create Todo
          </Button>
        </Box>
      </form>

      {/* Display the list of created todos */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Todos:</Typography>
        {todos.length > 0 ? (
          todos.map((todo, index) => (
            <Box key={index} sx={{ padding: 2, borderBottom: '1px solid #ccc' }}>
              <Typography><strong>Todo Name:</strong> {todo.todoName}</Typography>
              <Typography><strong>User ID:</strong> {todo.userId}</Typography>
              <Typography><strong>Is Completed:</strong> {todo.isCompleted ? 'Yes' : 'No'}</Typography>
            </Box>
          ))
        ) : (
          <Typography>No todos created yet.</Typography>
        )}
      </Box>
    </div>
  );
};

export default CreateTodo;
