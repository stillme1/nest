import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Settings } from './settings.model';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { AuthService } from 'src/accounts/auth.service';
import { Auth } from 'src/accounts/auth.model';

@Module({
  imports: [SequelizeModule.forFeature([Settings, Auth])],
  exports: [SequelizeModule],
  providers: [SettingsService, AuthService],
  controllers: [SettingsController],
})
export class SettingsModule {}
