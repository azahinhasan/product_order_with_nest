import { Injectable } from '@nestjs/common';
import { Order } from '../entity/order.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../../products/entity/product.entity';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';
import { QueryTypes } from 'sequelize';
import { UserDTO } from 'src/user/dto/user.dto';
import { ResponseWithPaginationInfoUser } from 'src/shared/pagination.dto';
@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderModel: typeof Order,
  ) {}

  async findByUserId(userId: number): Promise<Order[]> {
    return this.orderModel.findAll({ where: { userId } });
  }

  async findUsersWithOrders(page: number, limit: number): Promise<ResponseWithPaginationInfoUser> {
    const offset = (page - 1) * limit;
  
    const query = `
      SELECT 
        u.id AS id, 
        u.name AS name,
        u.username AS username, 
        COUNT(o.id) AS totalorders,
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', o.id,
            'quantity', o.quantity,
            'totalPrice', o."totalPrice",
            'product', JSON_BUILD_OBJECT(
              'id', p.id,
              'name', p.name,
              'category', p.category,
              'price', p.price
            )
          )
        ) AS orders
      FROM "Users" u
      LEFT JOIN "Orders" o ON o."userId" = u."id"
      LEFT JOIN "Products" p ON o."productId" = p."id"
      GROUP BY u.id
      ORDER BY totalorders DESC
      LIMIT ${limit} OFFSET ${offset};
    `;
  
    const usersWithOrders = await this.orderModel.sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
  

    const totalCountQuery = `
      SELECT COUNT(DISTINCT u.id) AS count 
      FROM "Users" u
      JOIN "Orders" o ON o."userId" = u."id";
    `;
    const totalCountResult = await this.orderModel.sequelize.query(totalCountQuery, {
      type: QueryTypes.SELECT,
    });
    interface TotalCountResult {
      count: string;
    }
    const totalCount = parseInt((totalCountResult[0] as TotalCountResult).count, 10);
  
    return {
      totalCount: totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      data: usersWithOrders as UserDTO[],
    };
  }

  async findTopUsersByOrderCount(): Promise<any> {
    const query = `
      SELECT 
        u.id AS id, 
        u.name, 
        u.username, 
        COUNT(o.id) AS totalorders
      FROM "Users" u
      LEFT JOIN "Orders" o ON o."userId" = u.id
      GROUP BY u.id
      HAVING COUNT(o.id) = (
        SELECT MAX(sub.totalorders) FROM (
          SELECT COUNT(o.id) AS totalorders
          FROM "Users" u
          LEFT JOIN "Orders" o ON o."userId" = u.id
          GROUP BY u.id
        ) sub
      )
      ORDER BY totalorders DESC;
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
