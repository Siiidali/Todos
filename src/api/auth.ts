import axios from "axios";

export const authUser = async (email: string) => {
  const { data: users } = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/authentification?email=${email}`
  );
  if (users && users.length) {
    localStorage.setItem("userId", users[0].id);
    return users[0];
  } else {
    return { error: "user dosn't exist" };
  }
};
