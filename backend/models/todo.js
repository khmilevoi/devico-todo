import mongoose from 'mongoose';

const { Schema } = mongoose;

const TodoSchema = new Schema({
  inner: { type: String },
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo;
