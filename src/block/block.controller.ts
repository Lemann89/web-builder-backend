import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockEntity } from './block.entity';
import { CreateBlockDto } from './dto/create-block.dto';

@Controller('blocks')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Get()
  async getBlocks(): Promise<BlockEntity[]> {
    return await this.blockService.findAll();
  }

  @Put(':id/data')
  async updateBlockData(@Param() params, @Body() data: any): Promise<void> {
    return await this.blockService.updateData(params.id, data);
  }

  @Post()
  async createBlock(@Body() blockData: CreateBlockDto): Promise<BlockEntity> {
    return this.blockService.create(blockData);
  }
}
