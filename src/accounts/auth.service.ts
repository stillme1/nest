// auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Auth } from './auth.model';
import * as bcrypt from 'bcrypt';
import { Transaction } from 'sequelize';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth)
    private authRepository: typeof Auth,
  ) {}

  async insertAuth(
    accountId: number,
    transaction: Transaction,
  ): Promise<string> {
    const salt = await bcrypt.genSalt();
    const authToken =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    const passwordHash = await this.hashPassword(authToken, salt);

    await this.authRepository.create<Auth>(
      {
        accountId: accountId,
        salt: salt,
        passwordHash: passwordHash,
      },
      {
        transaction: transaction,
      },
    );

    return authToken;
  }

  async validateUser(accountId: number, authToken: string): Promise<boolean> {
    const user = await this.authRepository.findOne({
      where: {
        accountId: accountId,
      },
    });

    if (!user) {
      return false;
    }

    if (
      !(await this.comparePasswords(authToken, user.passwordHash, user.salt))
    ) {
      return false;
    }

    return true;
  }

  private async comparePasswords(
    enteredPassword: string,
    hashedPassword: string,
    salt: string,
  ): Promise<boolean> {
    const hashedEnteredPassword = await this.hashPassword(
      enteredPassword,
      salt,
    );
    return hashedEnteredPassword === hashedPassword;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}
