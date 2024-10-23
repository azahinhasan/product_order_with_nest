import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @ApiProperty()
  @Field()
  name: string;

  @ApiProperty()
  @Field()
  price: number;

  @ApiProperty()
  @Field()
  category: string;
}
