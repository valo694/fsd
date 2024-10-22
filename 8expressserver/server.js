//npm init -y
//npm i express

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON requests (for POST requests)
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Simple Express Server!');
});

app.get('/hello', (req, res) => {
    res.send('Hello, World!');
});

// Define a POST route that accepts JSON data
app.post('/submit', (req, res) => {
    const { name, age } = req.body;
    res.send(`Hello ${name}, you are ${age} years old.`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
