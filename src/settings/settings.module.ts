import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Settings } from './settings.model';

@Module({
  imports: [SequelizeModule.forFeature([Settings])],
  exports: [SequelizeModule],
})
export class SettingsModule {}
