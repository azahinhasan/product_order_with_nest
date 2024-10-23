import { ObjectType, Field,InputType } from '@nestjs/graphql';
import { ProductDTO } from 'src/products/dto/query-product.dto';
import { OrderDTO } from '../orders/dto/query-order.dto';
import { UserDTO } from '../user/dto/user.dto';
import { Min } from 'class-validator';

@ObjectType()
export class ResponseWithPaginationInfoProduct {

  @Field()
  totalCount: number;

  @Field()
  totalPages: number;

  @Field()
  currentPage: number;
  
  @Field(() => [ProductDTO]) 
  data: ProductDTO[];

}

@ObjectType()
export class ResponseWithPaginationInfoOrder {

  @Field()
  totalCount: number;

  @Field()
  totalPages: number;

  @Field()
  currentPage: number;
  
  @Field(() => [OrderDTO]) 
  data: OrderDTO[];
}

@ObjectType()
export class ResponseWithPaginationInfoUser {
  @Field()
  totalCount: number;

  @Field()
  totalPages: number;

  @Field()
  currentPage: number;

  @Field(() => [UserDTO]) 
  data: UserDTO[];
}

@InputType() 
export class Pagination {
  @Field({ defaultValue: 1 })
  @Min(1, { message: "page must be at least 1" })
  page?: number;

  @Field({ defaultValue: 10 })
  @Min(1, { message: "limit must be at least 1" })
  limit?: number;
}
