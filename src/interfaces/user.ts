import { ICategorynprice } from "./categorynprice";
import { IConversation } from "./conversation";

export interface IUser {
  facebookid: string;
  email: string;
  description: string;
  services: Array<ICategorynprice>;
  range: number;
  zipcode: string;
  fname: string;
  lname: string;
  imgurl: string;
}
