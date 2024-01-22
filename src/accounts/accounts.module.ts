import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Accounts } from './accounts.model';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { AuthService } from './auth.service';
import { Auth } from './auth.model';

@Module({
  imports: [SequelizeModule.forFeature([Accounts, Auth])],
  controllers: [AccountsController],
  providers: [AccountsService, AuthService],
})
export class AccountsModule {}
