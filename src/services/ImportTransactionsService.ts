import fs from 'fs';
import csvtojson from 'csvtojson';
import Transaction from '../models/Transaction';
import CreateTransactionService from './CreateTransactionService';

interface Request {
  importFile: string;
}

class ImportTransactionsService {
  async execute({ importFile }: Request): Promise<Transaction[]> {
    const transactionsCsv = await csvtojson().fromFile(importFile);

    const transactions: Transaction[] = [];

    const createTransactionService = new CreateTransactionService();

    for (const transactionArray of transactionsCsv) {
      const transaction = await createTransactionService.execute(
        transactionArray,
      );
      transactions.push(transaction);
    }
    // TODO

    await fs.promises.unlink(importFile);

    return transactions;
  }
}

export default ImportTransactionsService;
