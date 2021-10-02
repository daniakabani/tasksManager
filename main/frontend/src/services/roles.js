import { HttpClient } from "../helpers/index";

const getRoleByID = (id) => {
  return HttpClient({
    path: `roles/${id}`,
    method: "GET",
  });
};

const getAllRoles = () => {
  return HttpClient({
    path: "roles",
    method: "GET",
  });
};

export { getRoleByID, getAllRoles };
