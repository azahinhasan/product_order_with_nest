import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType() 
export class ProductDTO {
  @Field() 
  id?: number;

  @Field() 
  name: string;

  @Field() 
  price: number;

  @Field()
  category: string;

  @Field({ nullable: true })
  totalsales?: number;
}
