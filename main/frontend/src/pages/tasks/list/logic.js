import { useState, useEffect } from "react";
import { getAllTasks as getAllTasksService } from "../../../services/tasks";

const HandleTasksLoadingLogic = () => {
  const [tasks, setTasks] = useState(null);
  const [tasksAreLoading, setLoading] = useState(true);
  const [pageCount, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeStatus, setStatus] = useState("in-progress")
  useEffect(() => {
    getAllTasksService(currentPage, activeStatus)
      .then((response) => {
        setTasks(response?.results);
        setLoading(false);
        setPages(response.page_count);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [currentPage, activeStatus]);

  const handleTasksPagination = (pageNumber = 1) => {
    return setCurrentPage(pageNumber)
  }

  const handleStatusChange = (value = null) => {
    return setStatus(value)
  }

  return { tasks, tasksAreLoading, pageCount, handleTasksPagination, activeStatus, handleStatusChange };
};


export { HandleTasksLoadingLogic };
