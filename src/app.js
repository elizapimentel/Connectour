const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv-safe').config();

const db = require('./config/mongoConfig');
const userRoutes = require('./routes/userRouter');
const postRoutes = require('./routes/postRouter');

db.connect();

app.use(cors());
app.use(express.json());
app.use("/post", postRoutes);
app.use("/user", userRoutes);

module.exports = app;