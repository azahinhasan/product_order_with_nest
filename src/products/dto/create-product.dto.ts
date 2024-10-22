import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Field()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Field()
  category: string;
}
