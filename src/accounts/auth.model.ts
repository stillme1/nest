// auth.model.ts
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Accounts } from './accounts.model';

@Table
export class Auth extends Model<Auth> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  salt: string;

  @Column
  passwordHash: string;

  @ForeignKey(() => Accounts)
  @Column
  accountId: number;
}
