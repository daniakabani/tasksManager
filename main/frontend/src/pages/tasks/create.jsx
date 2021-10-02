import React, { useEffect, useContext, useState } from "react";
import context from "../../providers/context";
import InputField from "../../components/inputField";
import { getAllCars } from "../../services/cars";
import { createListing } from "../../services/listings";
import Button from "../../components/button";
import { FormSerializer } from "../../helpers";
import { useHistory } from "react-router-dom";
import Select from "react-select";

const CreateListing = () => {
  const [{ role }] = useContext(context);
  const history = useHistory();
  const [state, setState] = useState({
    cars: null,
    selectedCar: null,
  });
  const { cars, selectedCar } = state;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { dateFrom, dateTo } = FormSerializer(e.currentTarget);
    createListing({
      start_at: dateFrom,
      end_at: dateTo,
      car_id: selectedCar,
    })
      .then(() => {
        history.push("/tasks");
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    getAllCars()
      .then((response) => {
        let tmpCarsArray = [];
        response?.results?.map((car) => {
          return tmpCarsArray.push({
            label: `${car?.id}- ${car?.brand}, ${car?.model}`,
            value: car?.id,
          });
        });
        setState({
          ...state,
          cars: tmpCarsArray,
        });
      })
      .catch((e) => console.error(e));
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
          <h1>Create a new Listing</h1>
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <InputField
              name="dateFrom"
              placeHolder="Start Date"
              type="date"
              required
            />
            <InputField
              name="dateTo"
              placeHolder="End Date"
              type="date"
              required
            />
            <Select
              placeholder="Car"
              options={cars ?? []}
              onChange={(e) => handleUsersSelect(e)}
              className="select"
            />
            <Button content="Create" />
          </form>
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

export default CreateListing;
