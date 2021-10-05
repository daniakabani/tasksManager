import { HttpClient } from "helpers";

const getSubTaskById = (id) => {
  return HttpClient({
    path: `tasks/${id}`,
    method: "GET",
  });
};

const createSubTask = (body) => {
  return HttpClient({
    path: `tasks`,
    method: "POST",
    body,
  });
};

const editSubTask = ({ id, body }) => {
  return HttpClient({
    path: `tasks/${id}`,
    method: "POST",
    body,
  });
};

export { createSubTask, editSubTask, getSubTaskById };
