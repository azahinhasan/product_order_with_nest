import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserDTO {
  @Field()
  id: number;

  @Field()
  username: string;

  @Field()
  name: string; 
}
