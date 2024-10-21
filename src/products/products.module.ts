import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsService } from './service/products.service';
import { ProductsResolver } from './resolver/products.resolver';
import { Product } from './entity/product.entity';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  providers: [ProductsService, ProductsResolver],
})
export class ProductsModule {}
