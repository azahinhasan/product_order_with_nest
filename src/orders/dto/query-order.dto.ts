import { ObjectType, Field } from '@nestjs/graphql';
import { ProductDTO } from '../../products/dto/query-product.dto'
import { IsNotEmpty } from 'class-validator';
;
@ObjectType()
export class OrderDTO {
  @Field()
  id?: number;

  @Field()
  @IsNotEmpty()
  userId: number;

  @Field()
  @IsNotEmpty()
  productId: number;

  @Field()
  @IsNotEmpty()
  quantity: number;

  @Field()
  totalPrice: number;

  @Field()
  status?: string;

  @Field(() => ProductDTO, { nullable: true })
  product?: ProductDTO;

}
