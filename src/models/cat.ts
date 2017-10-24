import { Document, Schema, Model, model } from "mongoose";
import { ICat } from "../interfaces/cat";

// Not really sure it needs this, but the tutorial had the interface so I will too
export interface ICatModel extends ICat, Document {
  myNameIs(): string;
}

export var CatSchema: Schema = new Schema({
  name: String,
  age: Number,
  color: String,
  modified: Date
});

CatSchema.pre("save", function(next) {
  let now = new Date();
  if (!this.modified) {
    this.modified = now;
  }
  next();
});

// More interface shenanigans...
CatSchema.methods.myNameIs = function(): string {
  return "Hello, my name is " + this.name;
};

export const Cat: Model<ICatModel> = model<ICatModel>("Cat", CatSchema);
export default Cat;
