import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionsRepositoryDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];
  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = { income: 0, outcome: 0, total: 0 };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.balance;
  }

  public create({title, value, type }: TransactionsRepositoryDTO): Transaction {
    const transaction = new Transaction({
      title: title,
      value: value,
      type: type,
    });    
    
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
