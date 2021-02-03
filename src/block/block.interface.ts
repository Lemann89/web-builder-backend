export interface IBlock {
  id: number;
  childrenBlocks: IBlock[];
  blockType: string;
  data?: any;
}
