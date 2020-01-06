import jsonwebtoken from 'jsonwebtoken';

import UserModel from '../models/user';

const getUserByLogin = (login) => UserModel.findOne({ login });

const createToken = (login) => jsonwebtoken.sign(
  { data: login, exp: Date.now() / 1000 + 60 * 60 },
  process.env.SECRET,
  {
    algorithm: 'HS256',
  },
);

const auth = {
  register: async (ctx) => {
    const { body } = ctx.request;
    const { login, password } = body;

    const user = await getUserByLogin(login);

    if (!user) {
      const token = createToken(login);

      UserModel.create({ login, password });

      return ctx.resolve({ token });
    }

    return ctx.badRequest({ message: 'User exist' });
  },
  login: async (ctx) => {
    const { body } = ctx.request;
    const { login, password } = body;

    const user = await getUserByLogin(login);

    if (!user) {
      return ctx.unauthorized({ message: 'Bad login' });
    }

    if (user.password === password) {
      const token = createToken(user.login);

      return ctx.resolve({ token });
    }

    return ctx.unauthorized({ message: 'Bad password' });
  },
};

export default auth;
