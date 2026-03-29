import { Test, TestingModule } from '@nestjs/testing'
import { WeddingService } from './wedding.service'
import { WeddingRepository } from './wedding.repository'

describe('WeddingService', () => {
  let service: WeddingService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeddingService,
        {
          provide: WeddingRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<WeddingService>(WeddingService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
