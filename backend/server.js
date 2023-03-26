require('dotenv').config();
const express  = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const morgan = require('morgan')
const app = express();

// initialize connection to the database
mongoose.connect(process.env.MONGO_DB_URI)
  .then(() => console.log('Established a connection on MONGO DB was successful.'))
  .catch((err) => console.log(err))

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URI }));

const authRouter = require('./routes/auth');
app.use('/api', authRouter);

const port = process.env.PORT || 8002;

app.listen(port, () => console.log(`App is running on http://localhost:${port}`));