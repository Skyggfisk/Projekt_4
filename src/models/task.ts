import { Document, Schema, Model, model } from "mongoose";
import { ITask } from "../interfaces/task";

export interface ITaskModel extends ITask, Document {}

export var TaskSchema: Schema = new Schema({
  title: String,
  creationDate: Date,
  description: String,
  categories: Array,
  taskID: String
});

export const Task: Model<ITaskModel> = model<ITaskModel>("Task", TaskSchema);
export default Task;
