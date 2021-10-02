import React, { useEffect, useContext, useState } from "react";
import { getAllListings, deleteListing } from "../../services/listings";
import { confirmMessage } from "../../helpers";
import { useHistory, Link } from "react-router-dom";
import context from "../../providers/context";
import Button from "../../components/button";
import ReactPaginate from "react-paginate";
import "react-toggle/style.css";

const CarAvailabilityList = () => {
  const [{ role }] = useContext(context);
  const history = useHistory();
  const [state, setState] = useState({
    isLoading: true,
    data: null,
    currentPage: 1,
    pageCount: 1,
  });
  const { isLoading, data, currentPage, pageCount } = state;
  useEffect(() => {
    getAllListings({ include: "car", page_size: 10, page: currentPage })
      .then((response) => {
        setState({
          ...state,
          data: response?.results,
          isLoading: false,
          pageCount: response?.page_count,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }, [currentPage]);

  const handleRedirects = (location) => {
    history.push(`/${location}`);
  };

  const handlePageChange = (page) => {
    let pageNumber = Number(page + 1);
    if (pageNumber <= pageCount) {
      setState({
        ...state,
        currentPage: pageNumber,
      });
    }
  };

  const handleListingDelete = (id) => {
    let confirm = confirmMessage(`confirm deleting ${id}?`);
    if (confirm) {
      setState({
        ...state,
        isLoading: true,
        currentPage: null,
      });
      Promise.resolve()
        .then(async () => {
          await deleteListing(id);
        })
        .then(() => {
          setState({
            ...state,
            currentPage: 1,
          });
        })
        .catch((e) => console.error(e));
    } else {
      setState({
        ...state,
        isLoading: false,
      });
    }
  };

  return (
    <div id="main">
      <div className="content">
        <header>
          <h1>Car Availabilities</h1>
          {role === "super_user" && (
            <Link to="/listings/new">Create new listing</Link>
          )}
        </header>
        <div className="list-view">
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <ul className="api-data">
              {data?.map((item, key) => (
                <li key={key}>
                  <h2>
                    {item?.car?.brand}, {item?.car?.model}
                  </h2>
                  <h3>
                    <span>from:</span>{" "}
                    {new Date(item?.start_at)
                      .toString()
                      .slice(0, 10)
                      .replace(/-/g, "")}
                  </h3>
                  <h3>
                    <span>to:</span>{" "}
                    {new Date(item?.end_at)
                      .toString()
                      .slice(0, 10)
                      .replace(/-/g, "")}
                  </h3>
                  <div className="actions">
                    <Button
                      onClick={() => handleRedirects(`listings/${item?.id}`)}
                      success
                      content="view"
                    />
                    {role === "super_user" && (
                      <Button
                        onClick={() =>
                          handleRedirects(`listings/${item?.id}/edit`)
                        }
                        warning
                        content="edit"
                      />
                    )}
                    {role === "super_user" && (
                      <Button
                        onClick={() => handleListingDelete(item?.id)}
                        danger
                        content="delete"
                      />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
          {!isLoading && (
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={10}
              activeClassName={"active"}
              containerClassName="pagination"
              onPageChange={({ selected }) => handlePageChange(selected)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CarAvailabilityList;
