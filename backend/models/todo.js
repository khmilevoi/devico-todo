import mongoose from 'mongoose';

const { Schema } = mongoose;

const Todo = new Schema({
  inner: { type: String },
  completed: { type: Boolean, default: false }
});

const model = mongoose.model('Todo', Todo);

module.exports = model;
