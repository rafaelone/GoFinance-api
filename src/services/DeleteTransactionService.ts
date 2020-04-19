import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionRepostory = getRepository(Transaction);

    const transactionExists = await transactionRepostory.findOne({
      where: { id },
    });

    if (!transactionExists) {
      throw new AppError('You can remove a transaction that not exists', 400);
    }

    await transactionRepostory.remove(transactionExists);
  }
}

export default DeleteTransactionService;
