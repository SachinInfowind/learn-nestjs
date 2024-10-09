import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './infrastructure/schemas/user.schema';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './application/services/user.service';
// import { EventsGateway } from './chat/chat.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
export class EventsModule {}
