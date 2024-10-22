import { Injectable } from '@nestjs/common';
import { Order } from '../entity/order.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../../products/entity/product.entity';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';
import { QueryTypes } from 'sequelize';
import { UserDTO } from 'src/user/dto/user.dto';
@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderModel: typeof Order,
  ) {}

  async findByUserId(userId: number): Promise<Order[]> {
    return this.orderModel.findAll({ where: { userId } });
  }

  async findUsersWithOrders(): Promise<any[]> {
    const query = `
    SELECT 
      u.id AS id, 
      u.name AS name,
      u.username AS username, 
      COUNT(o.id) AS ordercount,
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'id', o.id,
          'productId',  o."productId",
          'quantity', o.quantity,
          'totalPrice', o."totalPrice"
        )
      ) AS orders
    FROM "Users" u
    LEFT JOIN "Orders" o ON o."userId" = u."id"
    GROUP BY u.id
    ORDER BY orderCount DESC;
  `;

    const usersWithOrders = await this.orderModel.sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    return usersWithOrders;
  }

  async findTopUsersByOrderCount(): Promise<any> {
    const query = `
      SELECT 
        u.id AS id, 
        u.name, 
        u.username, 
        COUNT(o.id) AS ordercount
      FROM "Users" u
      LEFT JOIN "Orders" o ON o."userId" = u.id
      GROUP BY u.id
      ORDER BY ordercount DESC
      LIMIT 1;
    `;

    const topUser = await this.orderModel.sequelize.query(query, {
      type: QueryTypes.SELECT,
    });


    return topUser;
  }

  async create(
    userId: number,
    productId: number,
    quantity: number,
  ): Promise<Order> {
    const product = await Product.findByPk(productId);
    const totalPrice = product.price * quantity;
    return this.orderModel.create({
      userId,
      productId,
      quantity,
      totalPrice,
      status: 'pending',
    });
  }

  async cancel(orderId: number): Promise<boolean> {
    const [affectedCount] = await this.orderModel.update(
      { status: 'canceled' },
      { where: { id: orderId } },
    );

    return affectedCount > 0;
  }
}
