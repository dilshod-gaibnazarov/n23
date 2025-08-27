import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import { Model } from 'mongoose';
import { ISuccessResponse } from 'src/interfaces/success-response';
import { getSuccessRes } from 'src/utils/getSuccessResponse';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    private readonly userService: UserService,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<ISuccessResponse> {
    await this.userService.findOne(createPostDto.userId);
    const newPost = await this.postModel.create(createPostDto);
    return getSuccessRes(newPost, 201);
  }

  async findAll(): Promise<ISuccessResponse> {
    const posts = await this.postModel.find().populate('userId');
    return getSuccessRes(posts);
  }

  async findOne(id: string): Promise<ISuccessResponse> {
    const post = await this.postModel.findById(id).populate('userId');
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return getSuccessRes(post);
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<ISuccessResponse> {
    const { userId } = updatePostDto;
    if (userId) {
      await this.userService.findOne(userId);
    }
    const post = await this.postModel.findByIdAndUpdate(id, updatePostDto, {
      new: true,
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return getSuccessRes(post);
  }

  async remove(id: string): Promise<ISuccessResponse> {
    const post = await this.postModel.findByIdAndDelete(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return getSuccessRes({});
  }
}
