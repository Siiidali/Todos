import { getTodos } from "../api/todos";

import TodoList from "../components/TodoList";
import { useTodosApi } from "../hooks/useTodosApi";
import { useUser } from "../hooks/useUser";

const Todos = () => {
  const user = useUser("userId");
  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useTodosApi("GET", getTodos);

  if (isLoading) {
    return <p>Loading ...</p>;
  }
  if (isError) {
    return <p>{error as string}</p>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-black text-center lg:text-start">
        Welcome to USER N°{user} !
      </h1>

      <TodoList todos={todos} />
    </div>
  );
};

export default Todos;
