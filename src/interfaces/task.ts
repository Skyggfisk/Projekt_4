import { ICategory } from "./category";

export interface ITask {
  title: string;
  creationDate: Date;
  date: Date;
  description: string;
  categories: Array<ICategory>;
  taskID: string;
  salary: number;
}
