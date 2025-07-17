import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { NotFoundId } from './users.exception';
import { BadRequestException } from '@nestjs/common';

describe('UsersCreateTest', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const mockUserService = {
    create: jest.fn(),
    findById: jest.fn(),
    updateUser: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('POST/users', () => {
    it('正常値', async () => {
      const createUser: CreateUserDto = {
        id: 1,
        userName: 'nageihgaiwe',
        email: 'test@test.com',
        password: 'password',
      };

      (mockUserService.create as jest.Mock).mockResolvedValue(createUser);
      await expect(usersController.create(createUser)).resolves.toEqual(
        createUser,
      );
    });

    it('ユーザーネームが長すぎる場合', async () => {
      const createUser: CreateUserDto = {
        id: 1,
        userName:
          'gisaugaiolngighariyua;h;jharoajhiaotliaghrsaejiagheiognaegjaiogiahorgnasejgiagiehanre.aieg',
        email: 'test@test.com',
        password: 'password',
      };

      (mockUserService.create as jest.Mock).mockRejectedValue(() => {
        throw new BadRequestException(
          'userName must be shorter than or equal to 50 characters',
        );
      });

      await expect(usersController.create(createUser)).rejects.toThrow(
        'userName must be shorter than or equal to 50 characters',
      );
    });

    it('メールアドレスが正しい形式じゃない場合', async () => {
      const createUser: CreateUserDto = {
        id: 1,
        userName: 'test',
        email: 'test-test.com',
        password: 'password',
      };

      (mockUserService.create as jest.Mock).mockRejectedValue(() => {
        throw new BadRequestException('email must be an email');
      });

      await expect(usersController.create(createUser)).rejects.toThrow(
        'email must be an email',
      );
    });

    it('パスワードが短い場合', async () => {
      const createUser: CreateUserDto = {
        id: 1,
        userName: 'test',
        email: 'test@test.com',
        password: 'ps',
      };
      (mockUserService.create as jest.Mock).mockRejectedValue(() => {
        throw new BadRequestException(
          'password must be longer than or equal to 6 characters',
        );
      });

      await expect(usersController.create(createUser)).rejects.toThrow(
        'password must be longer than or equal to 6 characters',
      );
    });
  });

  describe('GET/users/:id', () => {
    it('正常値', async () => {
      const getUser: CreateUserDto = {
        id: 1,
        userName: 'nageihgaiwe',
        email: 'test@test.com',
        password: 'password',
      };

      (mockUserService.findById as jest.Mock).mockResolvedValue(getUser);
      await expect(usersController.findById(1)).resolves.toEqual(getUser);
    });

    it('存在しないIDを指定いる時', async () => {
      (mockUserService.findById as jest.Mock).mockRejectedValue(
        new NotFoundId(2),
      );

      await expect(mockUserService.findById(2)).rejects.toThrow(
        `指定されたID:2は見つかりませんでした`,
      );
    });
  });

  describe('PUT/users/:id', () => {
    it('正常値', async () => {
      const updateUserDto: CreateUserDto = {
        id: 1,
        userName: 'nageihgaiwe',
        email: 'test@test.com',
        password: 'password',
      };
      const expectedResult: CreateUserDto = {
        id: 1,
        userName: 'gaiue',
        email: 'gna@na.com',
        password: 'gnaiu',
      };
      (mockUserService.updateUser as jest.Mock).mockResolvedValue(
        expectedResult,
      );
      await expect(
        usersController.updateUser(updateUserDto.id, updateUserDto),
      ).resolves.toEqual(expectedResult);
    });

    it('存在しないIDを指定いる時', async () => {
      (mockUserService.updateUser as jest.Mock).mockRejectedValue(
        new NotFoundId(2),
      );

      await expect(mockUserService.updateUser(2)).rejects.toThrow(
        `指定されたID:2は見つかりませんでした`,
      );
    });
  });

  describe('DELETE/users/:id', () => {
    it('正常値', async () => {
      const deleteUser: CreateUserDto = {
        id: 1,
        userName: 'nageihgaiwe',
        email: 'test@test.com',
        password: 'password',
      };
      (mockUserService.delete as jest.Mock).mockResolvedValue(deleteUser);
      await expect(usersController.delete(deleteUser.id)).resolves.toEqual(
        deleteUser,
      );
    });

    it('存在しないIDを指定いる時', async () => {
      (mockUserService.delete as jest.Mock).mockRejectedValue(
        new NotFoundId(2),
      );

      await expect(mockUserService.delete(2)).rejects.toThrow(
        `指定されたID:2は見つかりませんでした`,
      );
    });
  });
});
