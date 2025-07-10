import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../generated/prisma';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { EmailAlreadyExistsException, NotFoundId } from './users.exception';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findById(id: number): User {
    const users = this.users.find((user) => user.id === id);
    if (!users) {
      throw new NotFoundId(id);
    }
    return users;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;
    return await this.prismaService.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    // const emailExists = this.users.some(
    //   (user) => user.email === createUserDto.email,
    // );
    // if (emailExists) {
    //   throw new EmailAlreadyExistsException(createUserDto.email);
    // }
    // const user: User = {
    //   ...createUserDto,
    // };
    // this.users.push(user);
    // return user;
  }

  updateUser(updateUserDto: UpdateUserDto): User {
    const existingUser = this.findById(updateUserDto.id);
    const userIndex = this.users.findIndex(
      (user) => user.id === updateUserDto.id,
    );

    const emailExists = this.users.some(
      (user) =>
        user.email === updateUserDto.email && user.id !== updateUserDto.id,
    );

    if (emailExists) {
      throw new EmailAlreadyExistsException(updateUserDto.email);
    }

    const updatedUser = {
      ...existingUser,
      ...updateUserDto,
    };

    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  //デフォルト例外処理
  delete(id: number) {
    const userExists = this.users.some((user) => user.id === id);
    if (!userExists) {
      throw new NotFoundException();
    }
    this.users = this.users.filter((user) => user.id !== id);
  }
}


