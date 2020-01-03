const TodoModel = require('../models/todo');

const list = ctx => {
  ctx.body = TodoModel.find();
};

export default list;
