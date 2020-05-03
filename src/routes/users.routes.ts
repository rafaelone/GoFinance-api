import { Router } from 'express';

import UserService from '../services/CreateUserService';

const userRoter = Router();

userRoter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createUser = new UserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  return res.json(user);
});

userRoter.put('/', (req, res) => {
  return res.json({ UserUpdate: 'ok' });
});

export default userRoter;
