import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateWeddingDto } from './dto/create-wedding.dto'
import { UpdateWeddingDto } from './dto/update-wedding.dto'
import { WeddingRepository } from './wedding.repository'
import { Wedding } from 'prisma/generated/client'

@Injectable()
export class WeddingService {
  constructor(private weddingRepository: WeddingRepository) {}

  async create(createWeddingDto: CreateWeddingDto) {
    const currentDate = new Date().toISOString()

    const wedding = await this.weddingRepository.create({
      ...createWeddingDto,
      createdAt: currentDate,
      updatedAt: currentDate,
    })
    return wedding
  }

  findAll() {
    return this.weddingRepository.findAll()
  }

  async remove(id: number) {
    await this.weddingRepository.deleteOne({ id: id })
  }

  async update(id: number, updateWeddingDto: UpdateWeddingDto) {
    const existingWedding = await this.weddingRepository.findUnique({ id })
    if (!existingWedding) {
      throw new NotFoundException('Wedding not found')
    }
    const updatedWedding = await this.weddingRepository.updateById(id, {
      name: updateWeddingDto.name,
      date: updateWeddingDto.date,
      guest_count: updateWeddingDto.guest_count,
      currency: updateWeddingDto.currency,
      status: updateWeddingDto.status,
      isPlannerManaged: updateWeddingDto.isPlannerManaged,
    })
    return updatedWedding
  }

  async findOne(id: number) {
    const wedding = await this.weddingRepository.findUnique({ id })
    if (!wedding) {
      throw new NotFoundException('Wedding not found')
    }
    return wedding
  }
}
