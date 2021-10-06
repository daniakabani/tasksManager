import { HttpClient } from "helpers";

const getSubTaskById = (id) => {
  return HttpClient({
    path: `subtasks/${id}`,
    method: "GET",
  });
};

const createSubTask = (body) => {
  return HttpClient({
    path: `subtasks`,
    method: "POST",
    body,
  });
};

const editSubTask = ({ id, body }) => {
  return HttpClient({
    path: `subtasks/${id}`,
    method: "POST",
    body,
  });
};

export { getSubTaskById, createSubTask, editSubTask };
