export interface Todo {
  id?: number;
  userId: number;
  title: string;
  description: string;
  endDate: string;
  completed: boolean;
  pos?: number;
}
