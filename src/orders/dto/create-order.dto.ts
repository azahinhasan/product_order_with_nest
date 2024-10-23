import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType() 
export class CreateOrderInput {

  @ApiProperty()
  @Field() 
  productId: number;

  @ApiProperty()
  @Field()
  quantity: number;
}
