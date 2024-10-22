import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersService } from './service/orders.service';
import { OrdersResolver } from './resolver/orders.resolver';
import { Order } from './entity/order.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Order])],
  providers: [OrdersService, OrdersResolver,JwtService],
})
export class OrdersModule {}
