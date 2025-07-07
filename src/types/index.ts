export type TodoStatus = 'WillDo' | 'Active' | 'Progress' | 'Close';

export interface Todo {
  id: string;
  title: string;
  status: TodoStatus;
}