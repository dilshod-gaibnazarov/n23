import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    { id: 1, title: 'Shok xabar' },
    { id: 2, title: 'lorem ipsum' }
  ]

  create(createPostInput: CreatePostInput) {
    this.posts.push(createPostInput);
    return this.posts.at(-1);
  }

  findAll() {
    return this.posts;
  }

  findOne(id: number) {
    const post = this.posts.find(post => post.id == id);
    if (!post) {
      throw new ApolloError('Post not found', 'NOT FOUND');
    }
    return post;
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    const index = this.posts.findIndex(post => post.id === id);
    if (index === -1) {
      throw new ApolloError('Post not found', 'NOT FOUND');
    }
    this.posts[index] = updatePostInput;
    return this.posts[index];
  }

  remove(id: number) {
    const index = this.posts.findIndex(post => post.id === id);
    if (index === -1) {
      throw new ApolloError('Post not found', 'NOT FOUND');
    }
    this.posts.splice(index, 1);
    return this.posts;
  }
}
