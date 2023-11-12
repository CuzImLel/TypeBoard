export enum State {
  FINISHED = "finished",
  IN_PROGRESS = "progress",
  REMAINING = "remaining",
}

export enum Priority {
  HIGH = "High",
  MEDIUM = "Medium",
  Low = "Low",
}

export default interface TaskObject {
  _id: string;
  board: string;
  title: string;
  description: string;
  date: Date;
  state: State;
  progress: number;
  priority: Priority;
}
