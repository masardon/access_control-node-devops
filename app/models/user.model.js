const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
 username: {
  type: String,
  required: true
 },
 password: {
  type: String,
  required: true
 },
 role: {
  type: String,
  default: 'user_role',
  enum: ["user_role", "admin_role"]
 },
 accessToken: {
  type: String
 }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
