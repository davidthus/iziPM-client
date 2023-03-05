import { IProject } from "./project";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  notes: string;
  avatar: {
    data: Buffer;
    contentType: string;
  };
  projects: IProject[];
}
