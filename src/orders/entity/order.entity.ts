import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../products/entity/product.entity';

@Table
export class Order extends Model<Order> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Product)
  @Column
  productId: number;

  @Column
  quantity: number;

  @Column
  totalPrice: number;
}
