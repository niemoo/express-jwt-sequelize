const express = require('express');
const appRoute = require('./routes/categories');
const authRoute = require('./routes/AuthRouter');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// ROUTING
app.use('/api/v1/categories', appRoute);
app.use('/api/v1/auth', authRoute);

// SERVER
const port = process.env.PORT;
app.listen(port, (err) => {
  if (err) console.error(err);

  console.log(`listening on ${port}`);
});
