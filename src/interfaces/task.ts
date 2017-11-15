import { ICategory } from "./category";

export interface ITask {
  title: string;
  creationDate: Date;
  Description: string;
  categories: Array<ICategory>;
}
