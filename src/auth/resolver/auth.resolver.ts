import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from '../service/auth.service';
import { UserDTO } from '../../user/dto/user.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Resolver(() => UserDTO)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => UserDTO)
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async signup(
    @Args('username') username: string,
    @Args('password') password: string,
    @Args('name') name: string,
  ): Promise<UserDTO> {
    const user = await this.authService.signup(username, password, name);
    return { id: user.id, username: user.username, name: user.name };
  }

  @Mutation(() => String)
  @ApiResponse({ status: 200, description: 'Successfully logged in.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  async login(@Args('username') username: string, @Args('password') password: string) {
    return (await this.authService.login(username, password)).accessToken;
  }
}
