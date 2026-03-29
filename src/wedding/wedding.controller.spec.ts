import { Test, TestingModule } from '@nestjs/testing'
import { WeddingController } from './wedding.controller'
import { WeddingService } from './wedding.service'

describe('WeddingController', () => {
  let controller: WeddingController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeddingController],
      providers: [
        {
          provide: WeddingService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile()

    controller = module.get<WeddingController>(WeddingController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
