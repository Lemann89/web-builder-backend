import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('block')
export class BlockEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'parent_block_id' })
  parentBlockId: number;

  @Column('jsonb')
  data: any;

  @Column({ name: 'component_type' })
  blockType: string;
}
