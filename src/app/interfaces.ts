export interface ItreeNode {
  name: string;
  type: string;
  children?: ItreeNode[];
  id?: number;
  filesCount?: number;
}

export interface Itree {
  tree: ItreeNode[];
}

