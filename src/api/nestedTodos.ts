import axios from "axios";

import { NestedTodo } from "../types/nestedtodo";

export const getNestedTodos = async (id: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/nestedTodos?todoId=${id}`
  );
  return data as NestedTodo[];
};

export const addNestedTodo = async (nestedTodo: NestedTodo) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/nestedTodos`,
    nestedTodo
  );
  return data as NestedTodo;
};

export const deleteNestedTodo = async (id: number) => {
  return await axios.delete(
    `${import.meta.env.VITE_API_BASE_URL}/nestedTodos/${id}`
  );
};

export const updateNestedTodo = async (id: number, newData: any) => {
  const { data } = await axios.patch(
    `${import.meta.env.VITE_API_BASE_URL}/nestedTodos/${id}`,
    newData
  );
  return data as NestedTodo;
};
