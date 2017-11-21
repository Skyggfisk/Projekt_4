import { ICategorynprice } from "./categorynprice";

export interface IUser {
  facebookid: string;
  description: string;
  services: Array<ICategorynprice>;
  range: number;
  zipcode: string;
  fname: string;
  lname: string;
  imgurl: string;
}
