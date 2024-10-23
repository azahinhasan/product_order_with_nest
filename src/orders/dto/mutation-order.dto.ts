import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Min } from 'class-validator';

@InputType() 
export class CreateOrderInput {

  @ApiProperty()
  @Field() 
  @Min(0, { message: "productId must be a non-negative number" })
  productId: number;

  @ApiProperty()
  @Field()
  @Min(0, { message: "quantity must be a non-negative number" })
  quantity: number;
}
