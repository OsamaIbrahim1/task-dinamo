import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as env from './config';
import { AuthModule, FavoriteModule } from './modules';


@Module({
  imports: [
    MongooseModule.forRoot(env.DB_CONNECTION),
    AuthModule,
    FavoriteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
