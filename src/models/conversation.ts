import { Document, Schema, Model, model } from "mongoose";

// Schema defines how chat messages will be stored in MongoDB
export interface IConversationModel extends Document {}

export var ConversationSchema: Schema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

export const Conversation: Model<IConversationModel> = model<
  IConversationModel
>("Conversation", ConversationSchema);
export default Conversation;
