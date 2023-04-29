import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { authUser } from "../api/auth";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  return (
    <form
      className="flex flex-col items-center gap-5 mt-7"
      onSubmit={handleSubmit(async ({ email }) => {
        const data = await authUser(email);
        console.log(data);

        if (data.error) {
          setError(data.error);
        } else {
          navigate("/", { replace: true });
          navigate(0);
        }
        return navigate("/");
      })}
    >
      <h1 className="text-3xl font-black">Please Enter Your E-mail</h1>
      <input
        className="w-1/4 p-3 border-2 border-gray-400 rounded-md focus:border-black"
        placeholder="Example@example.com"
        type="email"
        {...register("email", { required: "This is required filed" })}
      />
      {errors.email?.message && (
        <p className="text-red-500">{errors.email?.message}</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
      <button
        className="px-8 py-2 text-2xl text-black transition-all duration-300 ease-in bg-white border-2 border-black rounded-md hover:bg-black hover:text-white"
        type="submit"
      >
        LogIN
      </button>
    </form>
  );
};

export default Login;
