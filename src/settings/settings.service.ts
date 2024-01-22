import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Settings } from './settings.model';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings)
    private settingsRepository: typeof Settings,
  ) {}

  async createSetting(settingData: Settings): Promise<Settings> {
    await this.validateDataType(settingData);
    return await this.settingsRepository.create(settingData);
  }

  async updateSetting(id: number, settingData: Settings): Promise<Settings> {
    const existingSetting = await this.getExistingSetting(id);

    if (settingData.data_type !== null) {
      existingSetting.data_type = settingData.data_type;
    }
    if (settingData.value !== null) {
      existingSetting.value = settingData.value;
    }
    if (settingData.name !== null) {
      existingSetting.name = settingData.name;
    }
    existingSetting.updatedAt = new Date();

    await this.validateDataType(existingSetting);
    return existingSetting.save();
  }

  async deleteSetting(id: number): Promise<Settings> {
    const settingToDelete = await this.getExistingSetting(id);
    settingToDelete.deletedAt = new Date();
    return settingToDelete.save();
  }

  private async validateDataType(settingData: Settings): Promise<void> {
    if (settingData.value === null || settingData.value === undefined) {
      return Promise.reject('NULL_VALUE');
    }
    settingData.value = String(settingData.value);
    if (
      settingData.data_type === 'boolean' &&
      !['true', 'false'].includes(settingData.value.toLowerCase())
    ) {
      return Promise.reject('DATA_TYPE_MISMATCH');
    }

    if (
      settingData.data_type === 'number' &&
      isNaN(Number(settingData.value))
    ) {
      return Promise.reject('DATA_TYPE_MISMATCH');
    }

    if (
      settingData.data_type === 'string' &&
      typeof settingData.value !== 'string'
    ) {
      return Promise.reject('DATA_TYPE_MISMATCH');
    }
  }

  private async getExistingSetting(id: number): Promise<Settings> {
    const setting = await this.settingsRepository.findByPk(id);
    if (!setting) {
      return Promise.reject('INVALID_SETTING_ID');
    }
    if (setting.deletedAt) {
      return Promise.reject('SETTING_ALREADY_DELETED');
    }
    return setting;
  }
}
