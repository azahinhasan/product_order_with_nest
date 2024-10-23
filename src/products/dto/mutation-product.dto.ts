import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @ApiProperty()
  @Field()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @Field()
  @IsNotEmpty()
  @Min(0)
  price: number;

  @ApiProperty()
  @Field()
  @IsNotEmpty()
  category: string;
}
