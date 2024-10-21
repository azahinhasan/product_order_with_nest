import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserDTO } from '../dto/user.dto'; 
import { User } from '../entities/user.entity'; 

@Resolver(() => UserDTO)
export class UserResolver {
  @Query(() => UserDTO, { nullable: true }) 
  async user(@Args('id') id: number): Promise<UserDTO | null> {
    const user = await User.findByPk(id); 
    return user ? { id: user.id, username: user.username, name: user.name } : null;
  }
}
