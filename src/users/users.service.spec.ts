import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailAlreadyExistsException, NotFoundId } from './users.exception';
import { UpdateUserDto } from './dto/update-user.dto';

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
    it('emailが重複している時', async () => {
      const createUserDto: CreateUserDto = {
        id: 1,
        userName: 'test',
        email: 'test@test.com',
        password: 'password',
      };
      (prismaService.user.findUnique as jest.Mock).mockRejectedValue(
        new EmailAlreadyExistsException('test@test.com'),
      );
      await expect(usersService.create(createUserDto)).rejects.toThrow(
        'メールアドレス:test@test.comは既に登録されています',
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
      (prismaService.user.create as jest.Mock).mockResolvedValue(createUserDto);
      await expect(usersService.create(createUserDto)).resolves.toEqual({
        id: 1,
        userName: 'test',
        email: 'test1@test.com',
        password: 'password',
      });
    });
  });

  describe('findById', () => {
    it('idが見つからなかった時', async () => {
      (prismaService.user.findUnique as jest.Mock).mockRejectedValue(
        new NotFoundId(2),
      );

      await expect(usersService.findById(2)).rejects.toThrow(
        `指定されたID:2は見つかりませんでした`,
      );
    });

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
  });

  describe('update', () => {
    it('idが見つからなかった時', async () => {
      (prismaService.user.findUnique as jest.Mock).mockRejectedValue(
        new NotFoundId(99868),
      );

      await expect(usersService.findById(99868)).rejects.toThrow(
        `指定されたID:99868は見つかりませんでした`,
      );
    });

    it('正常系', async () => {
      const updateUserDto: UpdateUserDto = {
        id: 297452,
        userName: 'ganioseogah',
        email: 'ganjkeghwiyt@ngan.gaiue',
        password: 'hgkalhaiehga',
      };

      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(297452);
      (prismaService.user.update as jest.Mock).mockResolvedValue(updateUserDto);
      await expect(
        usersService.updateUser(297452, updateUserDto),
      ).resolves.toEqual({
        id: 297452,
        userName: 'ganioseogah',
        email: 'ganjkeghwiyt@ngan.gaiue',
        password: 'hgkalhaiehga',
      });
    });
  });

  describe('delete', () => {
    it('idが見つからなかった時', async () => {
      (prismaService.user.findUnique as jest.Mock).mockRejectedValue(
        new NotFoundId(99868),
      );

      await expect(usersService.findById(99868)).rejects.toThrow(
        `指定されたID:99868は見つかりませんでした`,
      );
    });

    it('正常値', async () => {
      const deleteUserDto: CreateUserDto = {
        id: 93251,
        userName: 'anguaew',
        email: 'lajga@gnae.com',
        password: 'glairhaowe',
      };
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(93251);
      (prismaService.user.delete as jest.Mock).mockResolvedValue(deleteUserDto);
      await expect(usersService.delete(93251)).resolves.toEqual({
        id: 93251,
        userName: 'anguaew',
        email: 'lajga@gnae.com',
        password: 'glairhaowe',
      });
    });
  });
});
