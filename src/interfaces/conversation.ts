import { IUser } from "./user";
import { IMessage } from "./message";
import { Document, Schema, Model, model } from "mongoose";

export interface IConversation {
  messages: Array<IMessage>;
  user: IUser;
}
