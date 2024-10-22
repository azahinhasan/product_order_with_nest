import { Injectable } from '@nestjs/common';
import { Product } from '../entity/product.entity';
import { InjectModel } from '@nestjs/sequelize';
import { ResponseWithPaginationInfoProduct } from 'src/shared/pagination.dto';
import { QueryTypes } from 'sequelize';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  async findAll(page: number, limit: number): Promise<ResponseWithPaginationInfoProduct> {
    const offset = (page - 1) * limit;
    const { count, rows } = await this.productModel.findAndCountAll({
      limit: limit,
      offset: offset,
    });
  
    return {
      totalCount: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: rows
    };
  }
  async create(name: string, price: number, category: string): Promise<Product> {
    return this.productModel.create({ name, price, category });
  }

  async update(id: number, name: string, price: number, category: string): Promise<Product> {
    await this.productModel.update({ name, price, category }, { where: { id } });
    return this.productModel.findByPk(id);
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await this.productModel.destroy({ where: { id } });
    return deleted > 0;
  }

  async getTotalSalesByCategory(): Promise<any[]> {
    const query = `
      SELECT 
        category,
        COALESCE(SUM(price), 0) AS totalsales,
        COUNT(id) AS totalsoldproducts
      FROM "Products"
      GROUP BY category;
    `;

    const results = await this.productModel.sequelize.query(query, {
      type:QueryTypes.SELECT,
    });

    return results;
  }
}
