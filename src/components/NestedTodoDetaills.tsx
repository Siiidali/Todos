import { UseMutationResult } from "react-query";
import { deleteNestedTodo, updateNestedTodo } from "../api/nestedTodos";
import { useNestedTodosApi } from "../hooks/useNestedTodosApi";
import { NestedTodo } from "../types/nestedtodo";

interface nestedTodoDetaillsProps {
  nestedTodo: NestedTodo;
}

const NestedTodoDetaills = ({ nestedTodo }: nestedTodoDetaillsProps) => {
  const { mutate: completeMutation } = useNestedTodosApi(
    "PATCH",
    updateNestedTodo
  ) as UseMutationResult;
  const { mutate: deleteNestedTodoMutation } = useNestedTodosApi(
    "DELETE",
    deleteNestedTodo
  ) as UseMutationResult;
  const completedHandler = () => {
    completeMutation({
      id: nestedTodo.id,
      data: { completed: !nestedTodo.completed },
    });
  };

  return (
    <div className="flex flex-col w-full gap-4 p-4 mb-5 border border-gray-700 rounded-md">
      <div className="flex items-center justify-between ">
        <div className="flex gap-5">
          <input
            className="w-6 h-6 transition duration-150 ease-in-out border-2 border-black rounded-md appearance-none checked:bg-gray-950"
            type="checkbox"
            checked={nestedTodo.completed}
            onChange={completedHandler}
          />
          <h4 className="text-base font-bold">{nestedTodo.title}</h4>
        </div>
        <button
          className="px-2 py-1 text-white transition-all duration-300 ease-in bg-gray-900 border-2 rounded-md text-md hover:bg-white hover:text-gray-900"
          onClick={() => {
            deleteNestedTodoMutation({ id: nestedTodo.id });
          }}
        >
          Delete
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-xl">Description : {nestedTodo?.description}</p>
        <p className="text-xl">End Date : {nestedTodo?.endDate}</p>
      </div>
    </div>
  );
};

export default NestedTodoDetaills;
