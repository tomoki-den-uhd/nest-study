import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findById(id: number): User {
    const users = this.users.find((user) => user.id === id);
    if (!users) {
      throw new Error('ユーザが存在しません');
    }
    return users;
  }

  create(createUserDto: CreateUserDto): User {
    const user: User = {
      ...createUserDto,
    };
    this.users.push(user);
    return user;
  }

  updateUser(updateUserDto: UpdateUserDto): User {
    const existingUser = this.findById(updateUserDto.id);
    const userIndex = this.users.findIndex(
      (user) => user.id === updateUserDto.id,
    );

    this.users[userIndex] = { ...existingUser, ...updateUserDto };
    return this.users[userIndex];
  }

  delete(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
