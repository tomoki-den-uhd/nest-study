import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../generated/prisma';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { EmailAlreadyExistsException, NotFoundId } from './users.exception';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  private users: User[] = [];

  //findAllのDB化済み
  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  //findByIdのDB化済み 例外フィルター化済
  async findById(id: number): Promise<User> {
    const found = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!found) {
      throw new NotFoundId(id);
    }
    return found;
  }

  //createのDB化済
  async create(createUserDto: CreateUserDto): Promise<User> {
    const emailExists = this.prismaService.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (!emailExists) {
      throw new EmailAlreadyExistsException('createuserDto.email');
    }
    const { name, email, password } = createUserDto;
    return await this.prismaService.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }

  //DB化してさらに例外フィルターかけたい
  // const emailExists = this.prismaService.user.findUnique({
  //   where: { email: createUserDto.email },
  // });
  // if (!emailExists)
  //   throw new EmailAlreadyExistsException('createUserDto.eamil');

  // return await this.prismaService.user.create({  });

  //emailの例外フィルターかける前

  // const exists = await this.prisma.user.findUnique({ where: { email: data.email } });
  // if (exists) throw new ConflictException('Email already exists');
  // return this.prisma.user.create({ data });

  //DB化する前
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

  //   async updateUser(updateUserDto: UpdateUserDto): Promise<User> {

  //後でフィルター化
  // const existingUser = this.findById(updateUserDto.id);
  // const userIndex = this.users.findIndex(
  //   (user) => user.id === updateUserDto.id,
  // );

  // const emailExists = this.users.some(
  //   (user) =>
  //     user.email === updateUserDto.email && user.id !== updateUserDto.id,
  // );

  // if (emailExists) {
  //   throw new EmailAlreadyExistsException(updateUserDto.email);
  // }

  // const updatedUser = {
  //   ...existingUser,
  //   ...updateUserDto,
  // };

  //なぜエラーになっているのか後で検証
  // this.users[userIndex] = updatedUser;
  // return updatedUser;
  //   }

  //deleteのDB化済 フィルター化済
  async delete(id: number) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!userExists) {
      throw new NotFoundException();
    }
    return this.prismaService.user.delete({ where: { id } });
  }
}


