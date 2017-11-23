import { Document, Schema, Model, model } from "mongoose";

export interface IMessageModel extends Document {}

export var MessageSchema: Schema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
  }
);

export const Message: Model<IMessageModel> = model<IMessageModel>(
  "Message",
  MessageSchema
);
export default Message;
