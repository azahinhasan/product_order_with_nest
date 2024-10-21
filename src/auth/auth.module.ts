import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthResolver } from './resolver/auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { UserResolver } from '../user/resolver/user.resolver';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET||'1234',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, AuthResolver, UserResolver],
})
export class AuthModule {}
