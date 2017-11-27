import { IUser } from "./user";

export interface IMessage {
  message: String;
  user: IUser;
  timeStamp: Date;
  conversationID: String;
}
