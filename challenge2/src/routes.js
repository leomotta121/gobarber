import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ greetings: 'Hello world!' });
});

export default routes;
