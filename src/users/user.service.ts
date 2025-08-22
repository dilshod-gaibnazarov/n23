import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { IUser } from "./entity/user.entity";
import { v4 } from 'uuid';
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
    private users: IUser[] = [];

    async create(createUserDto: CreateUserDto) {
        const newUser = { id: v4(), ...createUserDto };
        this.users.push(newUser);
        return {
            statusCode: 201,
            message: 'success',
            data: newUser
        }
    }

    async findAll() {
        return {
            statusCode: 200,
            message: 'succes',
            data: this.users
        }
    }

    async findOne(id: string) {
        const user = this.users.find((user: IUser) => user.id === id);
        if (!user) {
            // throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            throw new NotFoundException('User not found');
        }
        return {
            statusCode: 200,
            message: 'success',
            data: user
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const index = this.users.findIndex((user: IUser) => user.id === id);
        if (index === -1) {
            throw new NotFoundException('User not found');
        }
        this.users[index] = { id, ...updateUserDto };
        return {
            statusCode: 200,
            message: 'success',
            data: this.users[index]
        }
    }

    async remove(id: string) {
        const index = this.users.findIndex((user: IUser) => user.id === id);
        if (index === -1) {
            throw new NotFoundException('User not found');
        }
        this.users.splice(index, 1);
        return {
            statusCode: 200,
            message: 'success',
            data: {}
        }
    }
}