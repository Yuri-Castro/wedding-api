import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger'
import { WeddingService } from './wedding.service'
import { CreateWeddingDto } from './dto/create-wedding.dto'
import { UpdateWeddingDto } from './dto/update-wedding.dto'
import { WeddingResponseDto } from './dto/wedding-response.dto'

@ApiTags('wedding')
@Controller('wedding')
export class WeddingController {
  constructor(private readonly weddingService: WeddingService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a wedding',
    description: 'Creates a new wedding record with the given details.',
  })
  @ApiCreatedResponse({ type: WeddingResponseDto })
  create(@Body() createWeddingDto: CreateWeddingDto) {
    return this.weddingService.create(createWeddingDto)
  }

  @Get()
  @ApiOperation({
    summary: 'Get all weddings',
    description: 'Returns a list of all weddings.',
  })
  @ApiOkResponse({ type: [WeddingResponseDto] })
  findAll() {
    return this.weddingService.findAll()
  }

  @ApiOperation({
    summary: 'Get a wedding by id',
    description: 'Returns a wedding by id.',
  })
  @ApiOkResponse({ type: WeddingResponseDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weddingService.findOne(+id)
  }

  @ApiOperation({
    summary: 'Update a wedding by id',
    description: 'Updates a wedding by id.',
  })
  @ApiOkResponse({ type: WeddingResponseDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeddingDto: UpdateWeddingDto) {
    return this.weddingService.update(+id, updateWeddingDto)
  }

  @ApiOperation({
    summary: 'Delete a wedding by id',
    description: 'Deletes a wedding by id. Returns 404 if not found.',
  })
  @ApiNoContentResponse({ description: 'Wedding deleted successfully' })
  @ApiNotFoundResponse({ description: 'Wedding not found' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.weddingService.remove(+id)
  }
}
