import axios from "axios";
import { Todo } from "../types/Todo";

export const getTodos = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/todos?userId=1`
  );
  return data as Todo[];
};

export const getTodo = async (id: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/todos/${id}`
  );
  return data as Todo;
};

export const addTodo = async (todo: Todo) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/todos?userId=1`,
    todo
  );
  return data as Todo;
};

export const deleteTodo = async (id: number) => {
  return await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/todos/${id}`);
};

export const updateTodo = async (id: number, newData: any) => {
  const { data } = await axios.patch(
    `${import.meta.env.VITE_API_BASE_URL}/todos/${id}`,
    newData
  );
  return data as Todo;
};
