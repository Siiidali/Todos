import { useForm } from "react-hook-form";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useTodosApi } from "../hooks/useTodosApi";
import { addTodo } from "../api/todos";
import { UseMutationResult } from "react-query";

const AddNewTodo = () => {
  const navigate = useNavigate();
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
  const { mutate: addNewTodo, isSuccess } = useTodosApi(
    "POST",
    addTodo
  ) as UseMutationResult;

  if (isSuccess) navigate("/");

  return (
    <div className="flex flex-col items-center w-full p-10">
      <h1 className="flex flex-col items-center mb-10 text-3xl font-black">
        Add A New Todo
      </h1>
      <form
        className="flex flex-col items-center w-2/4 gap-4 "
        onSubmit={handleSubmit((data) => {
          const newTodo = {
            ...data,
            completed: false,
            pos: 1,
            userId: parseInt(user!),
          };
          addNewTodo(newTodo);
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

export default AddNewTodo;
