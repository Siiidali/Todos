import NavBar from "./components/NavBar";
import { useUser } from "./hooks/useUser";
import AddNewTodo from "./pages/AddNewTodo";
import Login from "./pages/Login";
import TodoPage from "./pages/TodoPage";
import Todos from "./pages/Todos";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const user = useUser("userId");
  //const user = 1;

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={user ? <Todos /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/todos/:id"
          element={user ? <TodoPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/todos/new-todo"
          element={user ? <AddNewTodo /> : <Navigate to={"/login"} />}
        />
      </Routes>
    </>
  );
}

export default App;
