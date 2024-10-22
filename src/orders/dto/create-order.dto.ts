import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

@InputType() 
export class CreateOrderInput {

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Field() 
  productId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  @Field()
  quantity: number;
}
