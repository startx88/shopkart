import { ICategory } from './category.model';

export interface ISize {
  id?: string;
  title: string;
  sizes: string[];
  category: ICategory;
  slug?: string;
  active?: boolean;
  insertAt?: Date;
}
