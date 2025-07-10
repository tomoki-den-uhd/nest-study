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

  //createのDB化済 maillの例外化
  async create(createUserDto: CreateUserDto): Promise<User> {
    const emailExists = await this.prismaService.user.findUnique({
      where: { email: createUserDto.email },
    });
    console.log('通過');
    if (emailExists) {
      console.log('チェック通過');
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


