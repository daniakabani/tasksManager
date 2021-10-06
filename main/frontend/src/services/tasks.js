import { HttpClient } from "helpers";

const getAllTasks = ({
  page = 1,
  status = "in-progress",
  per_page: perPage = 50,
}) => {
  return HttpClient({
    path: `tasks?page=${page}&status=${status}&page_size=${Number(
      perPage
    )}`,
    method: "GET",
  });
};

const getTaskById = (id) => {
  return HttpClient({
    path: `tasks/${id}`,
    method: "GET",
  });
};

const createTask = (body) => {
  return HttpClient({
    path: `tasks`,
    method: "POST",
    body,
  });
};

const editTask = ({ id, body }) => {
  return HttpClient({
    path: `tasks/${id}`,
    method: "POST",
    body,
  });
};

export { createTask, editTask, getTaskById, getAllTasks };
