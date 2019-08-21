import express from 'express';
import User from './app/models/User';

const routes = express.Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Leo',
    email: 'mail@leomotta.com',
    password_hash: '123456',
  });

  return res.json(user);
});

export default routes;
