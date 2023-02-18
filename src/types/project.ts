export interface IProject {
  name: string;
  members: string[];
  projectCharter: string;
  completedPercent: number;
  startDate: Date;
  endDate?: Date;
  _id: string;
  pms: string[];
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
