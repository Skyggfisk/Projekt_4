import { ICategory } from "./category";

export interface ITask {
  title: string;
  creationDate: Date;
  description: string;
  categories: Array<ICategory>;
  taskID: string;
}
