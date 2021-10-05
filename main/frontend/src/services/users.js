import { HttpClient } from "helpers";

const Login = (body) => {
  return HttpClient({
    path: "users/login",
    method: "POST",
    body,
  });
};

const getAllUsers = ({
  username = "",
  page = 1,
  admins = false,
  users = false,
  page_size = 10,
}) => {
  return HttpClient({
    path: `users?page_size=${page_size}&page=${page}&username=${username}&admins=${admins}&users=${users}`,
    method: "GET",
  });
};

const getUserByID = (id) => {
  return HttpClient({
    path: `users/${id}`,
    method: "GET",
  });
};

const createUser = (body) => {
  return HttpClient({
    path: "users",
    method: "POST",
    body,
  });
};

const updateUser = (id, body) => {
  return HttpClient({
    path: `users/${id}`,
    method: "POST",
    body,
  });
};

const deleteUser = (id) => {
  return HttpClient({
    path: `users/${id}`,
    method: "DELETE",
  });
};

export { Login, getAllUsers, getUserByID, createUser, updateUser, deleteUser };
