import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthResolver } from './resolver/auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../guards/jwt-auth.guard';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET||'1234',
      signOptions: { expiresIn: '6h' },
    }),
  ],
  providers: [AuthService, AuthResolver,AuthGuard],
})
export class AuthModule {}
