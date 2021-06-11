export interface IStore {
  id?: string;
  title: string;
  slug?: string;
  image?: string;
  description?: string;
  active?: boolean;
  insertAt?: Date;
}
