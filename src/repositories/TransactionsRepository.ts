import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomesList: number[] = [0];
    const outcomesList: number[] = [0];
    this.transactions.forEach(t =>
      t.type === 'income'
        ? incomesList.push(t.value)
        : outcomesList.push(t.value),
    );
    const income = incomesList.reduce((prev, curr) => prev + curr);
    const outcome = outcomesList.reduce((prev, curr) => prev + curr);
    const total = income - outcome;
    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
