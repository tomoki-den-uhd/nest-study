import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailAlreadyExistsException, NotFoundId } from './users.exception';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

const mockPrismaService = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
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
    it('正常系', async () => {
      const createUserDto: CreateUserDto = {
        id: 1,
        userName: 'test',
        email: 'test1@test.com',
        password: 'password',
      };
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prismaService.user.create as jest.Mock).mockResolvedValue(createUserDto);
      await expect(usersService.create(createUserDto)).resolves.toEqual({
        id: 1,
        userName: 'test',
        email: 'test1@test.com',
        password: 'password',
      });
    });

    it('emailが重複している時', async () => {
      const createUserDto: CreateUserDto = {
        id: 1,
        userName: 'test',
        email: 'test@test.com',
        password: 'password',
      };

      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(
        createUserDto,
      );

      await expect(usersService.create(createUserDto)).rejects.toThrow(
        'メールアドレス:test@test.comは既に登録されています',
      );
    });
  });

  describe('findById', () => {
    it('正常系', async () => {
      const createUserDto: CreateUserDto = {
        id: 1,
        userName: 'テスト',
        email: 'test.findById@test.com',
        password: 'password',
      };
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue({});
      const expected = {};
      await expect(usersService.findById(1)).resolves.toEqual(expected);
    });

    it('idが見つからなかった時', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(usersService.findById(2)).rejects.toThrow(
        `指定されたID:2は見つかりませんでした`,
      );
    });
  });

  describe('update', () => {
    it('idが見つからなかった時', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        usersService.updateUser(99868, {
          id: 1,
          userName: 'test',
          email: 'test1@test.com',
          password: 'password',
        }),
      ).rejects.toThrow('指定されたID:99868は見つかりませんでした');
    });

    it('正常系', async () => {
      const updateUserDto: UpdateUserDto = {
        id: 297452,
        userName: 'ganioseogah',
        email: 'ganjkeghwiyt@ngan.gaiue',
        password: 'hgkalhaiehga',
      };

      (prismaService.user.findUnique as jest.Mock).mockResolvedValue({
        id: 297452,
        userName: 'ganioseogah',
        email: 'ganjkeghwiyt@ngan.gaiue',
        password: 'hgkalhaiehga',
      });

      (prismaService.user.update as jest.Mock).mockResolvedValue(updateUserDto);

      await expect(
        usersService.updateUser(297452, updateUserDto),
      ).resolves.toEqual(updateUserDto);
    });
  });

  describe('delete', () => {
    it('idが見つからなかった時', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(usersService.delete(99868)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('正常値', async () => {
      const deleteUserDto: CreateUserDto = {
        id: 93251,
        userName: 'anguaew',
        email: 'lajga@gnae.com',
        password: 'glairhaowe',
      };
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(
        deleteUserDto,
      );
      (prismaService.user.delete as jest.Mock).mockResolvedValue(deleteUserDto);

      await expect(usersService.delete(93251)).resolves.toEqual(deleteUserDto);
    });
  });
});
