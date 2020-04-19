import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionsBalance {
  transactions: Transaction[];
  balance: BalanceDTO;
}

interface BalanceDTO {
  income: number;
  outcome: number;
  total: number;
}

class GetTransactionsService {
  private transactionsRepository: TransactionsRepository;

  public constructor(repo: TransactionsRepository) {
    this.transactionsRepository = repo;
  }

  public execute(): TransactionsBalance {
    const transactions = this.transactionsRepository.all();
    const balance = this.transactionsRepository.getBalance();
    return { transactions, balance };
  }
}

export default GetTransactionsService;
