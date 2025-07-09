import { Injectable } from '@nestjs/common';
import { User } from './users.model';

@Injectable()
export class UsersService {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  create(user: User): User {
    this.users.push(user);
    return user;
  }

  updateUser() {
    return 'This is UserService update';
  }

  delete() {
    return 'This is UserService delete';
  }
}
