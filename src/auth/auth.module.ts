import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './service/auth.service';
import { UserEntity } from './models/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guard/jwt.guard';
import { JwtStrategy } from './guard/jwt.strategy'; 
import { RoleGuard } from './guard/role.guard';
import { UserService } from './service/user.service';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [JwtModule.registerAsync({
    useFactory: () => ({
      secret: process.env.JWT_SECRET,
      signOptions: ({ expiresIn: '60000' })
    })
  }) ,TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController, UserController],
  providers: [AuthService, JwtGuard, JwtStrategy, RoleGuard, UserService],
  exports: [AuthService, UserService]
})
export class AuthModule {}
