import { Todo } from "../types/Todo";
import TodoComponent from "./TodoComponent";

interface TodoListProps {
  todos: Todo[];
}

const TodoList = ({ todos }: TodoListProps) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="my-16 text-3xl font-bold text-gray-950">Your Tasks</h1>
      {todos?.length &&
        todos.map((todo: Todo) => <TodoComponent todo={todo} />)}
    </div>
  );
};

export default TodoList;
