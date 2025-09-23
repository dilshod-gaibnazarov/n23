import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createPostDto: CreatePostDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: createPostDto.userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const newPost = await this.prisma.post.create({
      data: createPostDto,
    });
    return newPost;
  }

  async findAll() {
    const posts = await this.prisma.post.findMany({ include: { user: true } });
    return posts;
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { user: true }
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.findOne(id);
    const post = await this.prisma.post.update({
      data: updatePostDto,
      where: { id },
    });
    return post;
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.post.delete({ where: { id } });
    return {};
  }
}
