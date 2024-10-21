import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Product extends Model<Product> {
  @Column
  name: string;

  @Column
  price: number;

  @Column
  category: string;
}
