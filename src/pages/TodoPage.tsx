import { UseMutationResult, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getNestedTodos } from "../api/nestedTodos";
import { NestedTodo } from "../types/nestedtodo";
import { deleteTodo, getTodo, updateTodo } from "../api/todos";
import NestedTodoDetaills from "../components/NestedTodoDetaills";
import { useTodosApi } from "../hooks/useTodosApi";
import AddNestedTodo from "../components/AddNestedTodo";

const TodoPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: todo } = useQuery(["Todos", "todo"], {
    queryFn: async () => {
      return await getTodo(id!);
    },
  });
  const { mutate: deleteTodoMutation } = useTodosApi(
    "DELETE",
    deleteTodo
  ) as UseMutationResult;
  const {
    data: nestedTodos,
    isLoading,
    isError,
    error,
  } = useQuery(["Todos", "nestedTodos"], {
    queryFn: async () => {
      return await getNestedTodos(id!);
    },
  });

  const { mutate: completeMutation } = useTodosApi(
    "PATCH",
    updateTodo
  ) as UseMutationResult;

  const completedHandler = () => {
    completeMutation({
      id: todo?.id,
      data: { completed: !todo?.completed },
    });
  };

  if (isLoading) return <p>loading ...</p>;
  if (isError) return <p>{error as string}</p>;

  return (
    <div className="flex flex-col justify-between w-full gap-20 p-10 lg:flex-row">
      <div className="w-full">
        <div className="flex flex-col gap-7">
          <div className="flex justify-between">
            <div className="flex flex-col items-center gap-4 text-center md:text-start md:flex-row">
              <input
                className="w-6 h-6 transition duration-150 ease-in-out border-2 border-black rounded-md appearance-none checked:bg-gray-950"
                type="checkbox"
                checked={todo?.completed}
                onChange={completedHandler}
              />
              <h4 className="text-2xl font-bold">{todo?.title}</h4>
            </div>

            <button
              className="px-2 py-1 text-white transition-all duration-300 ease-in bg-gray-900 border-2 rounded-md text-md hover:bg-white hover:text-gray-900"
              onClick={() => {
                deleteTodoMutation({ id: todo?.id });
                navigate("/");
              }}
            >
              Delete
            </button>
          </div>
          <div className="flex flex-col gap-8 ">
            <p className="text-xl font-bold">
              Description : {todo?.description}
            </p>
            <p className="text-xl font-bold">End Date : {todo?.endDate}</p>
          </div>
          <h4 className="mb-5 text-2xl font-bold text-black">Steps : </h4>
          {nestedTodos?.length == 0 ? (
            <p className="font-bold text-md">there is no step</p>
          ) : (
            nestedTodos?.map((nestedTodo: NestedTodo) => (
              <NestedTodoDetaills nestedTodo={nestedTodo} />
            ))
          )}
        </div>
      </div>
      <AddNestedTodo todoId={todo?.id!} />
    </div>
  );
};

export default TodoPage;
