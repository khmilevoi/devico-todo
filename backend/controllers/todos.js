import TodoModel from '../models/todo';

const todos = {
  list: async (ctx) => {
    const res = await TodoModel.find();
    ctx.body = res;
  },
  todo: async (ctx, id) => {
    const res = await TodoModel.findById(id);
    ctx.body = res;
  },
  add: async (ctx) => {
    const { inner } = ctx.query;
    const todo = await TodoModel.create({ inner });

    ctx.body = todo;
  },
  toggle: async (ctx, id) => {
    const res = await TodoModel.findById(id);
    const todo = await TodoModel.updateOne(res, { completed: !res.completed });

    ctx.body = todo;
  },
  delete: async (ctx, id) => {
    const todo = await TodoModel.deleteOne({ _id: id });

    ctx.body = todo;
  },
  update: async (ctx, id) => {
    const { inner } = ctx.query;
    const res = await TodoModel.findById(id);
    const todo = await TodoModel.updateOne(res, { inner });

    ctx.body = todo;
  },
};

export default todos;
