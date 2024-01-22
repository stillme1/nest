import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Accounts } from './accounts.model';

@Module({
  imports: [SequelizeModule.forFeature([Accounts])],
  exports: [SequelizeModule],
})
export class AccountsModule {}
