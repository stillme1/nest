import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Accounts } from './accounts.model';
import { Transaction } from 'sequelize';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Accounts)
    private accountsRepository: typeof Accounts,
  ) {}

  async findAll(): Promise<Accounts[]> {
    return this.accountsRepository.findAll<Accounts>();
  }

  async findOne(name: string): Promise<Accounts> {
    return this.accountsRepository.findOne<Accounts>({
      where: { name: name },
    });
  }

  async insertAccount(
    account: Accounts,
    transaction: Transaction,
  ): Promise<Accounts> {
    const existingAccount = await this.findOne(account.name);
    if (existingAccount) {
      return Promise.reject('DUPLICATE_ACCOUNT');
    }
    return this.accountsRepository.create<Accounts>(account, {
      transaction: transaction,
    });
  }
}
