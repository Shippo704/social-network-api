// add required packages
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// set up express
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Check for successful connection in connection.js
db.once('open', () => {
  console.log("Database connected!")
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});