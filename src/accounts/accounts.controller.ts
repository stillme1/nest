import { Controller, Post, Body } from '@nestjs/common';
import { Accounts } from './accounts.model';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  async createAccount(@Body() accountData: Accounts): Promise<Accounts> {
    return await this.accountsService.insertAccount(accountData);
  }
}
