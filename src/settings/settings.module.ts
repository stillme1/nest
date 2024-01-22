import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Settings } from './settings.model';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';

@Module({
  imports: [SequelizeModule.forFeature([Settings])],
  exports: [SequelizeModule],
  providers: [SettingsService],
  controllers: [SettingsController],
})
export class SettingsModule {}
