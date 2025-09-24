import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { ApolloError } from 'apollo-server-express';
import { v4 } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: v4(), fullName: 'Eshmat', age: 24, email: 'eshmat@gmail.com' },
    { id: v4(), fullName: 'Toshmat', age: 25, email: 'toshmat@gmail.com' },
  ]

  create(createUserInput: CreateUserInput) {
    const newUser = { id: v4(), ...createUserInput };
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find(user => user.id == id);
    if (!user) {
      throw new ApolloError('User not found', 'NOT FOUND');
    }
    return user;
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      throw new ApolloError('User not found', 'NOT FOUND');
    }
    this.users[index] = updateUserInput;
    return this.users[index];
  }

  remove(id: string) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      throw new ApolloError('User not found', 'NOT FOUND');
    }
    this.users.splice(index, 1);
    return this.users;
  }
}
