import { Document, Schema, Model, model } from "mongoose";
import { User } from "../models/user";
import { Message } from "../models/message";
import { IConversation } from "../interfaces/conversation";

export interface IConversationModel extends IConversation, Document {}

var ConversationSchema: Schema = new Schema({
  user: Array
});

export const Conversation: Model<IConversationModel> = model<
  IConversationModel
>("Conversation", ConversationSchema);

export default Conversation;
