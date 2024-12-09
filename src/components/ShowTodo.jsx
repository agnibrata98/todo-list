import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Box, Typography, IconButton, TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Modal styling
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ShowTodo = () => {
  const [todo, setTodo] = useState([]); // Holds the list of todos
  const [input, setInput] = useState(''); // For the input field value (userId)
  const [search, setSearch] = useState(''); // To trigger search on userId submission
  const [open, setOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [visibleItems, setVisibleItems] = useState(10); // Initially display 10 items
  const [loading, setLoading] = useState(true); // Track loading state

  const handleOpen = (todo) => {
    setSelectedTodo(todo);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleDelete = (item) => {
    const updatedTodo = todo.filter((todo) => todo.id !== item.id);
    setTodo(updatedTodo);
  };

  

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 10); // Show 10 more items
  };

  // Handles form submission to search todos by userId
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(input); // Set the search term to the userId entered in the input field
    setLoading(true); // Set loading while fetching new data
    setInput(''); // Clear the input field after submission
  };

  // Fetch all todos or todos based on userId from the API
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        let res;
        if (search) {
          // Fetch todos for a specific userId
          res = await axios.get(`https://dummyjson.com/todos/user/${search}`);
        } else {
          // Fetch all todos if no userId is provided
          res = await axios.get('https://dummyjson.com/todos?limit=300');
        }
        setTodo(res.data.todos); // Set the fetched todos to the state
        setLoading(false); // Set loading to false after data is fetched
        console.log(res.data.todos);
      } catch (err) {
        console.error(err);
        setLoading(false); // Stop loading in case of an error
      }
    };
    fetchTodos();
  }, [search]); // Fetch todos when the search value (userId) changes
  

  let todoIndex = 1;

  return (
    <>
      {/* Search form for userId */}
      <div>
      {/* <Link to='/create'>Create Todo</Link> */}
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mt: 2 }}>
            <TextField
              variant="outlined"
              type="number" // Set the input type to number to ensure user enters a valid userId
              name="search"
              id="search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter User ID..."
              sx={{
                width: '300px',
              }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                height: '56px',
              }}
            >
              Search by User ID
            </Button>
          </Box>
        </form>
      </div>

      {/* Loading indicator */}
      {loading ? (
        <Typography variant="h6" sx={{ mt: 4 }}>
          Loading...
        </Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>Todo</TableCell>
                  <TableCell>Is Completed</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todo.slice(0, visibleItems).map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{todoIndex++}</TableCell>
                    <TableCell>{item.todo}</TableCell>
                    <TableCell>{item.completed ? 'Completed' : 'Not Completed'}</TableCell>
                    <TableCell style={{ display: 'flex', gap: '10px' }}>
                      <Button variant="contained" onClick={() => handleOpen(item)}>
                        View Details
                      </Button>
                      <Button variant="contained" onClick={() => handleDelete(item)}>
                       Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Load More button */}
          {visibleItems < todo.length && (
            <Button variant="contained" onClick={handleLoadMore} sx={{ mt: 2 }}>
              Load More
            </Button>
          )}

          {/* Modal for displaying todo details */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box sx={style}>
              {/* Close button at the top-right corner */}
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CancelIcon />
              </IconButton>
              {selectedTodo && (
                <>
                  <Typography id="modal-title" variant="h6" component="h2">
                    {selectedTodo.id}
                  </Typography>
                  <Typography id="modal-description" sx={{ mt: 2 }}>
                    <strong>Todo:</strong> {selectedTodo.todo}
                  </Typography>
                  <Typography id="modal-description" sx={{ mt: 2 }}>
                    <strong>UserId</strong> {selectedTodo.userId}
                  </Typography>
                  <Typography id="modal-description" sx={{ mt: 2 }}>
                    <strong>Is Completed:</strong> {selectedTodo.completed ? 'Completed' : 'Not Completed'}
                  </Typography>
                </>
              )}
            </Box>
          </Modal>
        </>
      )}
    </>
  );
};

export default ShowTodo;
