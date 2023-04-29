import { useForm } from "react-hook-form";
import { useUser } from "../hooks/useUser";
import { addNestedTodo } from "../api/nestedTodos";
import { UseMutationResult } from "react-query";
import { useNestedTodosApi } from "../hooks/useNestedTodosApi";

interface AddNestedTodoProps {
  todoId: number;
}

const AddNestedTodo = ({ todoId }: AddNestedTodoProps) => {
  const user = useUser("userId");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      endDate: "",
    },
  });
  const { mutate: addNewNestedTodo } = useNestedTodosApi(
    "POST",
    addNestedTodo
  ) as UseMutationResult;

  return (
    <div className="flex flex-col items-center w-full p-10 ">
      <h1 className="flex flex-col items-center mb-10 text-3xl font-black">
        Add A New Todo
      </h1>
      <form
        className="flex flex-col items-center w-full gap-4 "
        onSubmit={handleSubmit((data) => {
          const newTodo = {
            ...data,
            todoId: todoId,
            completed: false,
            pos: 1,
            userId: parseInt(user!),
          };
          addNewNestedTodo(newTodo);
        })}
      >
        <input
          className="w-full p-3 border-2 border-gray-400 rounded-md focus:border-black"
          {...register("title", { required: "This is required filed" })}
          type="text"
          placeholder="Do a homework"
          onChange={() => {}}
        />
        <p className="text-red-500">{errors.title?.message}</p>
        <input
          className="w-full p-3 border-2 border-gray-400 rounded-md focus:border-black"
          {...register("description")}
          type="text"
          placeholder="Description"
          onChange={() => {}}
        />
        <p className="text-red-500">{errors.description?.message}</p>

        <input
          className="w-full p-3 border-2 border-gray-400 rounded-md focus:border-black"
          {...register("endDate")}
          type="text"
          placeholder="End Date"
          onChange={() => {}}
        />
        <p className="text-red-500">{errors.endDate?.message}</p>

        <button
          className="px-8 py-2 text-2xl text-black transition-all duration-300 ease-in bg-white border-2 border-black rounded-md hover:bg-black hover:text-white"
          type="submit"
        >
          Add new To do
        </button>
      </form>
    </div>
  );
};

export default AddNestedTodo;
