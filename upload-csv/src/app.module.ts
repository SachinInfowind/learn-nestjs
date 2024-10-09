import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './domain/user/user.module';
import { AppController } from './app.controller';
import { UserController } from './domain/user/user.controller';

console.log(process.env.MONGOURL);
@Module({
  imports: [MongooseModule.forRoot(process.env.MONGOURL), UserModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
