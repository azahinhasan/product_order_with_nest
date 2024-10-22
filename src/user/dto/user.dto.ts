import { ObjectType, Field } from '@nestjs/graphql';
import { OrderDTO } from 'src/orders/dto/query-order.dto';

@ObjectType()
export class UserDTO {
  @Field()
  id: number;

  @Field()
  username: string;

  @Field()
  name: string; 

  @Field(() => [OrderDTO], { nullable: true })
  orders?: OrderDTO[];

  @Field({ nullable: true })
  ordercount?: string; 
}
