const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

require('dotenv-safe').config();

const app = express();

const db = require('./config/mongoConfig');
const usersSchema = require('./models/usersSchema');
const userRoutes = require('./routes/userRouter');
const postRoutes = require('./routes/postRouter');
const indexRoutes = require('./routes/indexRouter')

db.connect();

app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
    if (req.headers["x-access-token"]) {
     const token = req.headers["x-access-token"];
     const { userId, exp } = await jwt.verify(token, process.env.SECRET);
     // Check if token has expired
     if (exp < Date.now().valueOf() / 1000) { 
      return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
     } 
     res.locals.loggedInUser = await usersSchema.findById(userId); next(); 
    } else { 
     next(); 
    } 
   });

app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/", indexRoutes);

module.exports = app;