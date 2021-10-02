import React, { useEffect, useState } from "react";
import { getListingByID } from "../../services/listings";
import { getUserByID } from "../../services/users";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ListingView = () => {
  const [state, setState] = useState({
    isLoading: true,
    data: null,
    owner: null,
  });
  const { isLoading, data, owner } = state;
  let { id: listingID } = useParams();

  useEffect(() => {
    let carInfo, ownerInfo;
    Promise.resolve()
      .then(async () => {
        let result = await getListingByID(listingID);
        carInfo = {
          id: result?.id,
          car: `${result?.car?.brand}, ${result?.car?.model}`,
          fromDate: result?.start_at,
          toDate: result?.end_at,
          created_at: new Date(result?.created_at)?.toString() ?? "N/A",
          owner: result?.car?.user_id,
          car_id: result?.car_id,
        };
      })
      .then(async () => {
        ownerInfo = await getUserByID(carInfo?.owner);
      })
      .then(() => {
        setState({
          ...state,
          data: carInfo,
          isLoading: false,
          owner: ownerInfo,
        });
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div id="main">
      <div className="content">
        <header>
          <h1>{isLoading ? "Loading..." : "Car details"}</h1>
        </header>
        <div className="view-data">
          <ul>
            <li>
              <span>ID:</span>
              {data?.id}
            </li>
            <li>
              <span>Car:</span>
              <Link to={`/cars/${data?.car_id}`}>{data?.car}</Link>
            </li>
            <li>
              <span>From:</span>
              {new Date(data?.fromDate).toString()}
            </li>
            <li>
              <span>To:</span>
              {new Date(data?.toDate).toString()}
            </li>
            <li>
              <span>Owner:</span>
              <Link to={`/users/${data?.owner}`}>{owner?.username}</Link>
            </li>
            <li>
              <span>Creation Date:</span>
              {data?.created_at}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ListingView;
