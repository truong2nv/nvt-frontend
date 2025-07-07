export type TodoStatus = 'WillDo' | 'Active' | 'Progress' | 'Close';
  
  export interface Todo {
    id: string;
    title: string;
    status: TodoStatus;
  }
  
  export const initialTodos: Todo[] = [
    { id: '1', title: 'Task 1', status: 'WillDo' },
    { id: '2', title: 'Task 2', status: 'Active' },
    { id: '3', title: 'Task 3', status: 'Progress' },
    { id: '4', title: 'Task 4', status: 'Close' },
  ];

  export const createEmptyTodo = (title: string): Todo => ({
    id: Date.now().toString(),
    title,
    status: 'WillDo',
  });