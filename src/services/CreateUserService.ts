import { getRepository } from 'typeorm';

import { hash } from 'bcryptjs';

import * as Yup from 'yup';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({ where: { email } });

    if (checkUserExists) {
      throw new AppError('Email address already used', 400);
    }

    const schema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .required('Email address is required')
        .email('Enter a valid email address'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'At least 6 characters'),
    });

    await schema.validate(
      { name, email, password },
      {
        abortEarly: true,
      },
    );

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
