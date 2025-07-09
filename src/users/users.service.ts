import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findAll() {
    return 'This is UsersService';
  }

  create() {
    return 'This is UserService create';
  }

  updateUser() {
    return 'This is UserService update';
  }

  delete() {
    return 'This is UserService delete';
  }
}
