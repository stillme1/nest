import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Accounts extends Model<Accounts> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @Column
  deletedAt: Date;
}
