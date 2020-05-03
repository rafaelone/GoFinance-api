import { Router } from 'express';

const userRoter = Router();

userRoter.post('/', (req, res) => {
  return res.json({ User: 'ok' });
});

userRoter.put('/', (req, res) => {
  return res.json({ UserUpdate: 'ok' });
});

export default userRoter;
