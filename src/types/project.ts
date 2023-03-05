import { IUser } from "./user";

export interface IProject {
  name: string;
  owner: IUser;
  projectManagers: IUser[];
  members: IUser[];
  projectCharter: string;
  completedPercent: number;
  startDate: Date;
  endDate?: Date;
  _id: string;
  tasks: ITask[];
  groupChat: IMessage[];
}

export interface ITask {
  name: string;
  description: string;
  subtasks: ISubtask[];
  dueDate: Date;
  assignedTo: string[];
  _id: string;
  dependencies: string[];
}

export interface ISubtask {
  isCompleted: boolean;
  name: string;
}

export interface IMessage {
  content: string;
}
