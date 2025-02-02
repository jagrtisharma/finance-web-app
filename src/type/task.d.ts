
export interface iTask
{
  _id: number;
  title: string;
  category: string;
  money: string;
  description: string;
  result: boolean;
  creation_date: Date;
}

export interface iTaskStore {
  task: iTask[];
  setTask: (task: iTask[]) => void;
  
}
