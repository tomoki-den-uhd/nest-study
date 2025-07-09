import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModuleModule } from './users-module/users-module.module';

@Module({
  imports: [UsersModuleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
