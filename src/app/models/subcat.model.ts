import { ICategory } from './category.model';

export interface ISubCategory {
  category: ICategory;
  id?: string;
  title: string;
  slug?: string;
  image?: string;
  description?: string;
  active?: boolean;
  insertAt?: Date;
}
