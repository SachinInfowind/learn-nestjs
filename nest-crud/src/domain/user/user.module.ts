import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './infrastructure/schemas/user.schema';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './application/services/user.service';
import { VerifyToken } from './middleware/verifyToken.middleware';
// import { EventsGateway } from './chat/chat.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyToken)
      .exclude('/user/login', 'user/sign-up', 'user/get-all-users')
      .forRoutes(UserController);
  }
}
export class EventsModule {}
