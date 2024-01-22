import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Settings } from './settings.model';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  async createSetting(@Body() settingData: Settings): Promise<Settings> {
    try {
      return await this.settingsService.createSetting(settingData);
    } catch (error) {
      this.returnError(error);
    }
  }

  @Patch(':id')
  async updateSetting(
    @Param('id') id: number,
    @Body() settingData: Settings,
  ): Promise<Settings> {
    try {
      return this.settingsService.updateSetting(id, settingData);
    } catch (error) {
      this.returnError(error);
    }
  }

  @Delete(':id')
  async deleteSetting(@Param('id') id: number): Promise<Settings> {
    try {
      return await this.settingsService.deleteSetting(id);
    } catch (error) {
      this.returnError(error);
    }
  }

  returnError(error) {
    if (error === 'NULL_VALUE') {
      throw new HttpException('Value cannot be null', HttpStatus.BAD_REQUEST);
    }
    if (error === 'DATA_TYPE_MISMATCH') {
      throw new HttpException(
        'Value and data_type mismatch',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (error === 'SETTING_NOT_FOUND') {
      throw new HttpException(
        'Setting with provided id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    if (error === 'SETTING_ALREADY_DELETED') {
      throw new HttpException(
        'Setting with provided id already deleted',
        HttpStatus.BAD_REQUEST,
      );
    }
    throw error;
  }
}
