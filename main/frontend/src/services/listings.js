import { HttpClient } from "../helpers";

const getAllListings = ({ include = "car", page = 1, page_size = 10 }) => {
  return HttpClient({
    path: `listings?include=${include}&page=${page}&page_size=${page_size}`,
    method: "GET",
  });
};

const createListing = (body) => {
  return HttpClient({
    path: `listings`,
    method: "POST",
    body,
  });
};

const getListingByID = (id) => {
  return HttpClient({
    path: `listings/${id}`,
    method: "GET",
  });
};

const editListing = ({ id, body }) => {
  return HttpClient({
    path: `listings/${id}`,
    method: "POST",
    body,
  });
};

const deleteListing = (id) => {
  return HttpClient({
    path: `listings/${id}`,
    method: "DELETE",
  });
};

export {
  getAllListings,
  createListing,
  getListingByID,
  editListing,
  deleteListing,
};
