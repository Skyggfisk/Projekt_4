import { Document, Schema, Model, model } from "mongoose";
import { User } from "../models/user";
import { Message } from "../models/message";
import { IConversation } from "../interfaces/conversation";

export interface IConversationModel extends IConversation, Document {}

var ConversationSchema: Schema = new Schema({
  messages: Array,
  user: [{ type: Schema.Types.ObjectId, ref: User }] // Cannot nest schemas
});

// some efapjdpawd

export const Conversation: Model<IConversationModel> = model<
  IConversationModel
>("Conversation", ConversationSchema);

export default Conversation;
