import { Module } from '@nestjs/common';
import { StoreModule } from './store/store.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [StoreModule, PrismaModule],
})
export class AppModule {}
