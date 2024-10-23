import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { OrdersService } from '../service/orders.service';
import { Order } from '../entity/order.entity';
import {
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/jwt-auth.guard';
import { OrderDTO } from '../dto/query-order.dto';
import { CreateOrderInput } from '../dto/mutation-order.dto';
import { UserDTO } from '../../user/dto/user.dto';
import {
  Pagination,
  ResponseWithPaginationInfoUser,
} from 'src/shared/pagination.dto';

@ApiTags('orders')
@Resolver(() => OrderDTO)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}


  /*---------------------------------------- Query ---------------------------------------- */

  @UseGuards(AuthGuard)
  @Query(() => [OrderDTO])
  @ApiResponse({ status: 201, description: 'Will return a list of orders.' })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Order by User ID' })
  async getUserOrders(@Args('userId') userId: number): Promise<OrderDTO[]> {
    return this.ordersService.findByUserId(userId);
  }

  @UseGuards(AuthGuard)
  @Query(() => ResponseWithPaginationInfoUser)
  @ApiResponse({ status: 201, description: 'Will return a list of users with their orders and products info.' })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Users with Orders' })
  async getUsersWithOrders(
    @Args('pagination', { type: () => Pagination, nullable: true })
    pagination: Pagination,
  ): Promise<ResponseWithPaginationInfoUser> {
    const { page, limit } = pagination;
  
    const result = await this.ordersService.findUsersWithOrders(page, limit);
  
    return {
      totalCount: result.totalCount,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      data: result.data,
    };
  }

  @UseGuards(AuthGuard)
  @Query(() => [UserDTO])
  @ApiResponse({ status: 201, description: 'Will return the user who has the most orders.' })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get User with Most Orders' })
  async getTopUsersByOrderCount(): Promise<UserDTO> {
    return this.ordersService.findTopUsersByOrderCount();
  }


  /*---------------------------------------- Mutations ---------------------------------------- */

  @UseGuards(AuthGuard)
  @Mutation(() => OrderDTO)
  @ApiResponse({ status: 201, description: 'Order created successfully.' })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create an order.' })
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
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Order canceled successfully.' })
  async cancelOrder(@Args('orderId') orderId: number): Promise<boolean> {
    return this.ordersService.cancel(orderId);
  }
}
