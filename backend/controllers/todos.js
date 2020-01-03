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

    await TodoModel.create({ inner });

    ctx.body = await TodoModel.find();
  },
  toggle: async (ctx, id) => {
    const res = await TodoModel.findById(id);
    await TodoModel.updateOne(res, { completed: !res.completed });

    ctx.body = await TodoModel.find();
  },
  delete: async (ctx, id) => {
    await TodoModel.deleteOne({ _id: id });

    ctx.body = await TodoModel.find();
  },
  update: async (ctx, id) => {
    const { inner } = ctx.query;
    const res = await TodoModel.findById(id);
    await TodoModel.updateOne(res, { inner });

    ctx.body = await TodoModel.find();
  },
};

export default todos;
