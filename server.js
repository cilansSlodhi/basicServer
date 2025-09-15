// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory "database"
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

// --- CRUD APIs ---

// Create a new user
app.post('/api/users', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Read all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Read single user
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not founds' });
  res.json(user);
});

// Update a user
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });

  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  user.name = name;
  res.json(user);
});

// Delete a user
app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'User not found' });

  const deletedUser = users.splice(index, 1);
  res.json(deletedUser[0]);
});

app.get('/',(req,res) =>{
  return res.json({
    name:"Hello Sugriv"
  });
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
