import { ObjectType, Field } from '@nestjs/graphql';
import { ProductDTO } from '../../products/dto/query-product.dto';
@ObjectType()
export class OrderDTO {
  @Field()
  id?: number;

  @Field()
  userId: number;

  @Field()
  productId: number;

  @Field()
  quantity: number;

  @Field()
  totalPrice: number;

  @Field()
  status?: string;

  @Field(() => ProductDTO, { nullable: true })
  product?: ProductDTO;

}
