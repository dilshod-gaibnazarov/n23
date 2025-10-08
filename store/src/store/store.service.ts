import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createStoreDto: CreateStoreDto) {
    const store = await this.prisma.store.create({
      data: createStoreDto
    });
    return store;
  }

  async findAll() {
    const stores = await this.prisma.store.findMany();
    return stores;
  }

  async findOne(id: number) {
    const store = await this.prisma.store.findUnique({
      where: { id }
    });
    if (!store) {
      throw new NotFoundException('Store not found');
    }
    return store;
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    await this.findOne(id);
    const store = await this.prisma.store.update({
      data: updateStoreDto,
      where: { id }
    });
    return store;
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.store.delete({ where: { id } });
    return {};
  }
}
