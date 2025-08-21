import { Injectable } from "@nestjs/common";
import { IUser } from "./entity/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
    private users: IUser[] = [];

    async create(createUserDto: CreateUserDto) {
        this.users.push(createUserDto);
        return this.users;
    }
}