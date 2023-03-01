export interface Iuser {
  _id: string;
  username: string;
  email: string;
  password: string;
  notes: string;
  avatar: {
    data: Buffer;
    contentType: string;
  };
  projects: string[];
}
