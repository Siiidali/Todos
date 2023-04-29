export interface NestedTodo {
  todoId: number;
  id?: number;
  userId: number;
  title: string;
  description: string;
  endDate: string;
  completed: boolean;
  pos?: number;
}
