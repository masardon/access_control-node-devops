const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path')
const config = require('./app/config/auth.config');
const User = require('./app/models/user.model')
const routes = require('./app/routes/route.js');
const dbConfig = require('./app/config/db.config.js');
const app = express();
const PORT = process.env.PORT || 8001;

mongoose
 .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`)
 .then(() => {
  console.log('Connected to the MongoDB successfully');
 });

app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
 if (req.headers["x-access-token"]) {
  const accessToken = req.headers["x-access-token"];
  const { userId, exp } = await jwt.verify(accessToken, config.secret);
  if (exp < Date.now().valueOf() / 1000) {
   return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
  }
  res.locals.loggedInUser = await User.findById(userId); next();
 } else {
  next();
 }
});

app.use('/', routes); app.listen(PORT, () => {
  console.log('Server is listening on Port:', PORT)
})
