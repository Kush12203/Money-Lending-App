const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const app = express(); // Initialize the Express application
const PORT = process.env.PORT || 3000; // Set the server port as 3000

app.use(bodyParser.json()); // Use body-parser middleware to parse JSON request bodies
app.use('/api/auth', authRoutes); // Import authentication routes
app.use('/api/user', userRoutes); // Import user-related routes

// Connection to MongoDB
mongoose.connect('mongodb://localhost:27017/moneyLendingApp', {
  useNewUrlParser: true, // Use the new URL parser to avoid deprecation warnings
  useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
})
.then(() => { 
  console.log('Connected to Database'); // If connection is successfull 
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);// Displaying Current PORT Number
  });
})
.catch(err => console.log(err)); // If connection fails, error will be printed
