import { IsNotEmpty } from 'class-validator';

export class CreateBlockDto {
  @IsNotEmpty()
  readonly blockType: string;

  readonly data: any;

  readonly parentBlockId: number;

  readonly styles: any;
}
