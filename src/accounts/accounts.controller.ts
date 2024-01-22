import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Accounts } from './accounts.model';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  async createAccount(@Body() accountData: Accounts): Promise<Accounts> {
    try {
      return await this.accountsService.insertAccount(accountData);
    } catch (err) {
      if (err === 'DUPLICATE_ACCOUNT') {
        throw new HttpException(
          'Account with provided name already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw err;
    }
  }
}
