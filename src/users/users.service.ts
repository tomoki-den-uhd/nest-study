import { Injectable } from '@nestjs/common';
import { User } from './users.model';

@Injectable()
export class UsersService {
  private usres: User[] = [];

  findAll() {
    return 'This is UsersService';
  }

  create(user: User): User {
    this.usres.push(user);
    return user;
  }

  updateUser() {
    return 'This is UserService update';
  }

  delete() {
    return 'This is UserService delete';
  }
}
