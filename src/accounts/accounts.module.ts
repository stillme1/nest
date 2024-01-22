import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Accounts } from './accounts.model';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

@Module({
  imports: [SequelizeModule.forFeature([Accounts])],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
