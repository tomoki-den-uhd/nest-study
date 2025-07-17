import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { NotFoundId } from './users.exception';

describe('UsersCreateTest', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const mockUserService = {
    create: jest.fn(),
    findById: jest.fn(),
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
  });

  describe('GET/users/:id', () => {
    it('存在しないIDを指定いる時', async () => {
      (mockUserService.findById as jest.Mock).mockRejectedValue(
        new NotFoundId(2),
      );

      await expect(mockUserService.findById(2)).rejects.toThrow(
        `指定されたID:2は見つかりませんでした`,
      );
    });

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
  });
});
