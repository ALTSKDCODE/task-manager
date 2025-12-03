const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan'); //Logger
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
connectDB();

//Logging Setup
//Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

//Setup of the logger
app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.json());
app.use(cors());

//Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
