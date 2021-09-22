const config = require('../config/auth.config');
const User = require('../models/user.model');
const { roles } = require('../controllers/role.controller')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function hashPassword(password) {
 return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
 return await bcrypt.compare(plainPassword, hashedPassword);
}

exports.grantAccess = function(action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action!"
        });
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}

exports.allowIfLoggedin = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser;
    if (!user)
      return res.status(401).json({
        error: "You need to be logged in to get access!"
      });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

exports.signup = async (req, res, next) => {
 try {
  const { username, password, role } = req.body
  const hashedPassword = await hashPassword(password);
  const newUser = new User({ username, password: hashedPassword, role: role || "user_role" });
  const accessToken = jwt.sign({ userId: newUser._id }, config.secret, {
   expiresIn: config.jwtExpiration
  });
  newUser.accessToken = accessToken;
  await newUser.save();
  res.json({
   data: newUser,
   accessToken
  })
 } catch (error) {
  next(error)
 }
}

exports.login = async (req, res, next) => {
 try {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return next(new Error('Username does not exist!'));
  const validPassword = await validatePassword(password, user.password);
  if (!validPassword) return next(new Error('Password is not correct!'))
  const accessToken = jwt.sign({ userId: user._id }, config.secret, {
   expiresIn: config.jwtExpiration
  });
  await User.findByIdAndUpdate(user._id, { accessToken })
  res.status(200).json({
   data: { username: user.username, role: user.role },
   accessToken
  })
 } catch (error) {
  next(error);
 }
}

exports.getUsers = async (req, res, next) => {
 const users = await User.find({});
 res.status(200).json({
  data: users
 });
}

exports.getUser = async (req, res, next) => {
 try {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  if (!user) return next(new Error('User does not exist!'));
   res.status(200).json({
   data: user
  });
 } catch (error) {
  next(error)
 }
}

exports.updateUser = async (req, res, next) => {
 try {
  const update = req.body
  const userId = req.params.userId;
  await User.findByIdAndUpdate(userId, update);
  const user = await User.findById(userId)
  res.status(200).json({
   data: user,
   message: 'User has been updated!'
  });
 } catch (error) {
  next(error)
 }
}

exports.deleteUser = async (req, res, next) => {
 try {
  const userId = req.params.userId;
  await User.findByIdAndDelete(userId);
  res.status(200).json({
   data: null,
   message: 'User has been deleted!'
  });
 } catch (error) {
  next(error)
 }
}
