import { getRepository, getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import TransactionRepository from '../repositories/TransactionsRepository';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
  idUser: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
    idUser,
  }: Request): Promise<Transaction> {
    const categoryRepository = getRepository(Category);
    const transactionRepository = getCustomRepository(TransactionRepository);

    const { total } = await transactionRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw new AppError('Balance not available for transaction', 400);
    }

    let category_id: string;

    const checkCategoryExists = await categoryRepository.findOne({
      where: { title: category },
    });

    if (checkCategoryExists) {
      category_id = checkCategoryExists.id;
    } else {
      const newCategory = categoryRepository.create({ title: category });
      await categoryRepository.save(newCategory);
      category_id = newCategory.id;
    }

    if (type !== 'income' && type !== 'outcome') {
      throw new AppError('The type should be income or outcome', 400);
    }

    const transaction = transactionRepository.create({
      title,
      type,
      value,
      category_id,
      user_id: idUser,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
