import { IFile } from './file.model';

export interface IPageContent {
  id?: string;
  title: string;
  text: string;
  image: any;
  active?: boolean;
}

// page attributes
export interface IPage {
  id?: string;
  title: string;
  slug?: string;
  excerpt?: string;
  content?: IPageContent;
  hero?: string;
  active?: boolean;
  insertAt?: Date;
}
