import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Accounts } from './accounts.model';
import { AccountsService } from './accounts.service';
import { AuthService } from './auth.service';
import { Sequelize } from 'sequelize-typescript';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly authService: AuthService,
    private readonly sequelize: Sequelize,
  ) {}

  @Post()
  async createAccount(
    @Body() accountData: Accounts,
  ): Promise<{ data: Accounts; authToken: string }> {
    const transaction = await this.sequelize.transaction();
    try {
      const account = await this.accountsService.insertAccount(
        accountData,
        transaction,
      );
      const auth = await this.authService.insertAuth(account.id, transaction);
      const response = {
        data: account.toJSON(),
        authToken: auth,
      };
      await transaction.commit();
      return response;
    } catch (err) {
      await transaction.rollback();
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
