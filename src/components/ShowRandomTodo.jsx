import axios from 'axios';
import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';

const ShowRandomTodo = () => {
  const [randomTodo, setRandomTodo] = useState(null); // Use null to check if data exists

  const fetchRandomTodo = async () => {
    try {
      const res = await axios.get('https://dummyjson.com/todos/random');
      setRandomTodo(res.data); // Fetch a single random todo object
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Button variant="contained" onClick={fetchRandomTodo}>
        Get Random Todo
      </Button>

      {randomTodo && (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Todo</TableCell>
                <TableCell>Is Completed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={randomTodo.id}>
                <TableCell>{randomTodo.id}</TableCell>
                <TableCell>{randomTodo.todo}</TableCell>
                <TableCell>{randomTodo.completed ? 'Completed' : 'Not Completed'}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ShowRandomTodo;
