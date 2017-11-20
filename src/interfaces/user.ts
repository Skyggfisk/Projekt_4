import { ICategorynprice } from "./categorynprice";

export interface IUser {
  id: string;
  description: string;
  services: Array<ICategorynprice>;
  range: number;
  zipcode: string;
  fname: string;
  lname: string;
  imgurl: string;
}
