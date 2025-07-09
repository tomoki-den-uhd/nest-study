import { Injectable } from '@nestjs/common';
import { User } from './users.model';

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

  create(user: User): User {
    this.users.push(user);
    return user;
  }

  updateUser(user: User): User {
    const existingUser = this.findById(user.id);
    const userIndex = this.users.findIndex((user) => user.id === user.id);
    this.users[userIndex] = { ...existingUser, ...user };

    return this.users[userIndex];
  }

  delete(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
