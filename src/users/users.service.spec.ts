import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';

const mockPrismaService = {
  user: {
    create: jest.fn(),
  },
};

describe('UsersServieTest', () => {
  let usersService: UsersService;
  let prismaService: PrismaService;
  beforeEach(async () => {
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
});
