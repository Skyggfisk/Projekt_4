import { IUser } from "./user";
import { IMessage } from "./message";

export interface IConversation {
  messages: Array<IMessage>;
  user: IUser;
}
