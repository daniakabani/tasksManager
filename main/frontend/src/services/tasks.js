import { HttpClient } from "helpers";

const getAllTasks = (page = 1, status = "in-progress") => {
  return HttpClient({
    path: `tasks?page_size=20&page=${page}&status=${status}`,
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
