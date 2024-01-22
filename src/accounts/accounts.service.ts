import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Accounts } from './accounts.model';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Accounts)
    private accountsRepository: typeof Accounts,
  ) {}

  async findAll(): Promise<Accounts[]> {
    return this.accountsRepository.findAll<Accounts>();
  }

  async insertAccount(account: Accounts): Promise<Accounts> {
    const temp = new Accounts(account);
    return await temp.save();
  }
}
