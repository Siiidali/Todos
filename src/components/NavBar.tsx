import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const NavBar = () => {
  const user = useUser("userId");

  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between p-10 bg-gray-900">
      <h3 className="text-xl font-black text-center text-white md:text-4xl">
        TODOS APP
      </h3>
      <div>
        {user ? (
          <div className="flex gap-4 md:gap-8">
            <button
              onClick={() => {
                navigate("/todos/new-todo");
              }}
              className="px-4 py-2 text-base text-white transition-all duration-300 ease-in border-2 rounded-md md:px-8 md:py-2 md:text-2xl hover:bg-white hover:text-gray-900"
            >
              Add New Todo
            </button>
            <button
              className="px-4 py-2 text-base text-white transition-all duration-300 ease-in border-2 rounded-md md:px-8 md:py-2 md:text-2xl hover:bg-white hover:text-gray-900"
              onClick={() => {
                console.log("ss");

                localStorage.setItem("userId", "");
                navigate("/login");
                navigate(0);
              }}
            >
              Log Out
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NavBar;
