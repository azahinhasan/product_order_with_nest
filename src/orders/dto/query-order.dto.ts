import { ObjectType, Field } from '@nestjs/graphql';

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
}
