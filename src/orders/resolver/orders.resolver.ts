import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { OrdersService } from '../service/orders.service';
import { Order } from '../entity/order.entity';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/jwt-auth.guard';
import { OrderDTO } from '../dto/query-order.dto';
import { CreateOrderInput } from '../dto/create-order.dto';
import { UserDTO } from '../../user/dto/user.dto';
@ApiTags('orders')
@Resolver(() => OrderDTO)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard)
  @Query(() => [OrderDTO])
  async getUserOrders(@Args('userId') userId: number): Promise<OrderDTO[]> {
    return this.ordersService.findByUserId(userId);
  }

  @UseGuards(AuthGuard)
  @Query(() => [UserDTO])
  async getUsersWithOrders(): Promise<UserDTO[]> {
    return this.ordersService.findUsersWithOrders();
  }

  @UseGuards(AuthGuard)
  @Query(() => [UserDTO])
  async getTopUsersByOrderCount(): Promise<UserDTO> {
    return this.ordersService.findTopUsersByOrderCount();
  }

  @UseGuards(AuthGuard)
  @Mutation(() => OrderDTO)
  @ApiResponse({ status: 201, description: 'Order created successfully.' })
  async placeOrder(
    @Args('input') input: CreateOrderInput,
    @Context() context: any,
  ): Promise<OrderDTO> {
    const userId = context.req.user_id;
    const order = await this.ordersService.create(
      userId,
      input.productId,
      input.quantity,
    );
    return {
      id: order.id,
      userId: order.userId,
      productId: order.productId,
      quantity: order.quantity,
      totalPrice: order.totalPrice,
    };
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  @ApiResponse({ status: 200, description: 'Order canceled successfully.' })
  async cancelOrder(@Args('orderId') orderId: number): Promise<boolean> {
    return this.ordersService.cancel(orderId);
  }
}
