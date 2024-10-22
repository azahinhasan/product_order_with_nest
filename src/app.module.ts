import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module'; 
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { User } from './user/entities/user.entity';
import { Product } from './products/entity/product.entity';
import { Order } from './orders/entity/order.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost', 
      port: +process.env.DB_PORT || 5432, 
      username: process.env.DB_USERNAME || 'postgres', 
      password: process.env.DB_PASSWORD || '1234',
      database: process.env.DB_DATABASE || 'product_order_database_by_zahin',
      models: [User, Product, Order], 
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    AuthModule, 
    ProductsModule,
    OrdersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
