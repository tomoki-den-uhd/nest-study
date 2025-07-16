import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailAlreadyExistsException } from './users.exception';

const mockPrismaService = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
};

describe('UsersServieTest', () => {
  let usersService: UsersService;
  let prismaService: PrismaService;
  beforeEach(async () => {
    jest.clearAllMocks();
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('emailが正しくない時', async () => {
      const createUserDto: CreateUserDto = {
        id: 1,
        userName: 'test',
        email: 'test@test.com',
        password: 'password',
      };
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue({
        id: 2,
        userName: createUserDto.userName,
        email: createUserDto.email,
        password: createUserDto.password,
      });
      await expect(usersService.create(createUserDto)).rejects.toThrow(
        EmailAlreadyExistsException,
      );
    });

    it('正常系', async () => {
      const createUserDto: CreateUserDto = {
        id: 1,
        userName: 'test',
        email: 'test1@test.com',
        password: 'password',
      };
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prismaService.user.create as jest.Mock).mockResolvedValue({});
      const expected = {};
      await expect(usersService.create(createUserDto)).resolves.toEqual(
        expected,
      );
    });
  });
});
