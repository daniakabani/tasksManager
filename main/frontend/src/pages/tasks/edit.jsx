import React, { useEffect, useContext, useState } from "react";
import context from "../../providers/context";
import InputField from "../../components/inputField";
import { getAllCars } from "../../services/cars";
import { editListing, getListingByID } from "../../services/listings";
import Button from "../../components/button";
import { FormSerializer } from "../../helpers";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";

const EditListing = () => {
  const [{ role }] = useContext(context);
  const history = useHistory();
  const { id: listingID } = useParams();
  const [state, setState] = useState({
    cars: null,
    selectedCar: null,
    data: null,
    isLoading: true,
  });
  const { cars, selectedCar, data, isLoading } = state;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { dateFrom, dateTo } = FormSerializer(e.currentTarget);
    editListing({
      id: listingID,
      body: {
        start_at: dateFrom,
        end_at: dateTo,
        car_id: selectedCar ?? data?.car_id,
      },
    })
      .then(() => {
        history.push(`/listings/${listingID}`);
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    let tmpCarsArray = [];
    let listInfo;
    Promise.resolve()
      .then(async () => {
        let carsList = await getAllCars();
        carsList?.results?.map((car) => {
          return tmpCarsArray.push({
            label: `${car?.id}- ${car?.brand}, ${car?.model}`,
            value: car?.id,
          });
        });
      })
      .then(async () => {
        listInfo = await getListingByID(listingID);
      })
      .then(() => {
        setState({
          ...state,
          cars: tmpCarsArray,
          data: listInfo,
          isLoading: false,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const handleUsersSelect = (e) => {
    setState({
      ...state,
      selectedCar: Number(e.value),
    });
  };

  if (role === "super_user") {
    return (
      <div id="main">
        <div className="form-wrapper">
          <h1>{isLoading ? "Loading..." : "Edit Car Listing"}</h1>
          {!isLoading && (
            <form onSubmit={(e) => handleFormSubmit(e)}>
              <InputField
                defaultValue={data?.start_at?.split("T")[0]}
                name="dateFrom"
                placeHolder="Start Date"
                type="date"
              />
              <InputField
                defaultValue={data?.end_at?.split("T")[0]}
                name="dateTo"
                placeHolder="End Date"
                type="date"
              />
              <Select
                placeholder="Car"
                options={cars ?? []}
                onChange={(e) => handleUsersSelect(e)}
                className="select"
                defaultValue={cars[data?.car_id - 1]}
              />
              <Button content="Update" />
            </form>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div id="main">
        <div className="content">
          <header>
            <h1>Access Denied.</h1>
          </header>
        </div>
      </div>
    );
  }
};

export default EditListing;
