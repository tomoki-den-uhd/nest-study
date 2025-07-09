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

  updateUser() {
    return 'This is UserService update';
  }

  delete(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
