import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersService } from './service/orders.service';
import { OrdersResolver } from './resolver/orders.resolver';
import { Order } from './entity/order.entity';

@Module({
  imports: [SequelizeModule.forFeature([Order])],
  providers: [OrdersService, OrdersResolver],
})
export class OrdersModule {}
