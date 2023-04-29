import { Todo } from "../types/Todo";
import { useTodosApi } from "../hooks/useTodosApi";
import { updateTodo } from "../api/todos";
import { UseMutationResult } from "react-query";
import { useNavigate } from "react-router-dom";

interface TodoProps {
  todo: Todo;
}

const TodoComponent = ({ todo }: TodoProps) => {
  const navigate = useNavigate();
  const { mutate: completeMutation } = useTodosApi(
    "PATCH",
    updateTodo
  ) as UseMutationResult;

  const completedHandler = () => {
    completeMutation({ id: todo.id, data: { completed: !todo.completed } });
  };

  return (
    <div className="flex items-center justify-between w-full gap-4 p-4 mb-5 border border-gray-700 rounded-md lg:w-2/6">
      <div className="flex gap-5">
        <input
          className="w-6 h-6 transition duration-150 ease-in-out border-2 border-black rounded-md appearance-none checked:bg-gray-950"
          type="checkbox"
          checked={todo.completed}
          onChange={completedHandler}
        />
        <h4>{todo.title}</h4>
      </div>
      <button
        className="px-3 py-2 text-sm font-bold text-white transition-all duration-300 ease-in bg-gray-900 border-2 rounded-md text-md hover:bg-white hover:text-gray-900"
        onClick={() => {
          navigate(`/todos/${todo.id}`);
        }}
      >
        Preview
      </button>
    </div>
  );
};

export default TodoComponent;
