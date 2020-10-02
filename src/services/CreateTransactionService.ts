import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Request): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if(type == 'income'){
      balance.income += value;
    }
    else {
      balance.outcome += value;
    }

    balance.total = balance.income - balance.outcome;
    
    if(balance.total < 0){
      throw new Error('Balance extrapolado!')
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
