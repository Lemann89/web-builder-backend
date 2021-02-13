import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlockEntity } from './block.entity';
import { Repository } from 'typeorm';
import { IBlock } from './block.interface';
import { CreateBlockDto } from './dto/create-block.dto';

@Injectable()
export class BlockService {
  constructor(
    @InjectRepository(BlockEntity)
    private readonly blockRepository: Repository<BlockEntity>,
  ) {}

  findAll(): Promise<any> {
    return this.blockRepository.find({ order: { id: 'ASC' } }).then((res) => {
      const createTree = (blocks: BlockEntity[], id = null): IBlock[] => {
        return blocks
          .filter((block) => block['parentBlockId'] === id)
          .map(
            (block) =>
              ({
                id: block.id,
                blockType: block.blockType,
                data: block.data,
                styles: block.styles,
                childrenBlocks: createTree(blocks, block.id),
              } as IBlock),
          );
      };
      return createTree(res)[0];
    });
  }

  updateData(id, data: any): Promise<any> {
    return this.blockRepository.update({ id }, { data });
  }

  create(blockData: CreateBlockDto): Promise<BlockEntity> {
    return this.blockRepository.save(
      this.blockRepository.create({
        data: blockData.data,
        parentBlockId: blockData.parentBlockId,
        blockType: blockData.blockType,
        styles: blockData.styles,
      }),
    );
  }

  delete(id): Promise<any> {
    return this.blockRepository.delete({ id });
  }
}
