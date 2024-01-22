import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Accounts } from 'src/accounts/accounts.model';

@Table
export class Settings extends Model<Accounts> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column
  data_type: string;

  @Column
  value: string;

  @ForeignKey(() => Accounts)
  @Column
  account_id: number;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @Column
  deletedAt: Date;
}
