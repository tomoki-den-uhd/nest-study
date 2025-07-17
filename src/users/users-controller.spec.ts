import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersCreateTest', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const mockUserService = {
    create: jest.fn(),
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
});
