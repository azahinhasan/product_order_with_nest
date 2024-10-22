import { ObjectType, Field,InputType } from '@nestjs/graphql';
import { ProductDTO } from 'src/products/dto/query-product.dto';
import { OrderDTO } from '../orders/dto/query-order.dto';
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



@InputType() 
export class Pagination {
  @Field({ defaultValue: 1 }) 
  page?: number;

  @Field({ defaultValue: 10 })
  limit?: number;

  constructor(page?: number, limit?: number) {
    this.page = page || 1;  
    this.limit = limit || 10; 
  }
}
