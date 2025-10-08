import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class UserService {
  private userClient: ClientProxy;

  constructor() {
    this.userClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        port: 3001
      }
    });
  }

  create(dto: CreateUserDto) {
    return this.userClient.send('createUser', dto);
  }

  findAll() {
    return this.userClient.send('findAllUser', {});
  }

  findOne(id: string) {
    return this.userClient.send('findOneUser', id);
  }

  update(id: string, dto: UpdateUserDto) {
    return this.userClient.send('updateUser', { ...dto, id });
  }

  delete(id: string) {
    return this.userClient.send('removeUser', id);
  }
}
