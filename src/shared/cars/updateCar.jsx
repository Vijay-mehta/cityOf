import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../shared/Header/header";
import Sidebar from "../../shared/Sidebar/sidebar";
import "./updateCar.css";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Select from "react-select";

const UpdateCars = (props) => {
  let location = useLocation();

  console.log(location.state?.details, "111111");

  let BrandValur = [];
  console.log(BrandValur, "BrandValur");

  const propertyNames = Object.values(location.state?.details.brand);
  BrandValur.push(propertyNames);

  console.log(BrandValur, "BrandValur");

  let CarCategoryValur = [];
  const propertyNamesCarCategory = Object.values(
    location.state?.details.carCategory
  );
  CarCategoryValur.push(propertyNamesCarCategory);

  let CityValur = [];
  const propertyNamesCity = Object.values(location.state?.details.city);
  CityValur.push(propertyNamesCity);

  console.log(BrandValur, "BrandValur");
  const [Cars, setCar] = useState("");
  const [image, setImage] = useState("");
  const [disImage, setDisImage] = useState("");

  const [brandselect, setBrandSelect] = useState([]);
  const [brandChang, setBrandChang] = useState("");
  const [fuelselect, setFuelSelect] = useState([]);
  const [fuelChange, setFuelChange] = useState([]);
  const [categoryselect, setCategoryselect] = useState([]);
  const [carCategoryChange, setCarCategoryChange] = useState("");
  const [cityData, setCityData] = useState([]);
  const [CityId, setCityId] = useState("");
  let history = useHistory();

  function updateCarsData() {
    var data = new FormData();
    data.append("carsid", location.state.details?._id);
    data.append(
      "cars",
      Cars === "" || null ? location.state.details?.cars : Cars
    );
    data.append(
      "brand",
      brandChang.toString() === "" || null
        ? BrandValur?.map((item) => {
            console.log(item, "item");
            return (item[0].toString());
          })
        : brandChang
    );

    data.append(
      "fuel",
      fuelChange.toString() === "" || null
        ? location.state.details?.fuel
            ?.map((item) => {
              return item._id;
            })
            .toString()
        : fuelChange
    );

    data.append(
      "carCategory",
      carCategoryChange.toString() === "" || null
        ? CarCategoryValur?.map((item) => {
            console.log(item, "item");
            return (item[0].toString());
          })
        : carCategoryChange
    );

    data.append(
      "city",
      CityId.toString() === "" || null
        ? CityValur?.map((item) => {
            console.log(item, "item");
            return (item[0].toString());
          })
        : CityId
    );
    data.append(
      "image",
      image === "" || null ? location.state.details?.image : image
    );

    console.log(data);

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/editcar`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // window.location.reload(false);
        history.push("/Cars");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    //  getCars();
    brandGet();
    fuelGet();
    carCategoryGet();
    getCity();
  }, []);

  function brandGet() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getBrand`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response.data.data, "brandselect");

        let arrBrand = [];
        response.data.data.map((brandName) => {
          console.log(brandName.brands, "123");
          arrBrand.push({ label: brandName.brands, value: brandName._id });
        });
        setBrandSelect(arrBrand);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleChangeBrand = (e) => {
    console.log(e.value, "1234");
    setBrandChang(e.value);
  };

  function fuelGet() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/Getfuel`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response.data, "fuelselsct");

        let arrFuel = [];
        response.data.data.map((fuelName) => {
          arrFuel.push({ label: fuelName.fuel, value: fuelName._id });
        });

        setFuelSelect(arrFuel);
        // setFuelSelect(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleChangeFuel = (event) => {
    let fuelArraySelect = [];
    event.forEach((item) => {
      // console.log(item.label,"item")
      fuelArraySelect.push(item.value);
    });
    setFuelChange(fuelArraySelect);
    console.log(fuelArraySelect, "car");
  };

  function carCategoryGet() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getCarCategory`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response.data.data, "6768627");

        let arrCategory = [];
        response.data.data.map((categoryName) => {
          arrCategory.push({
            label: categoryName.carCategory,
            value: categoryName._id,
          });
        });

        setCategoryselect(arrCategory);

        //  setCategoryselect(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const handleChangeCategory = (e) => {
    console.log(e.label, "cat");
    setCarCategoryChange(e.value);
  };

  function getCity() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getCity`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response.data, "city");

        let arrCity = [];
        response.data.data.map((item) => {
          arrCity.push({ label: item.city, value: item._id });
        });
        console.log(arrCity, "arrCity");
        setCityData(arrCity);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleChangeCity = (e) => {
    setCityId(e.value);
  };

  const IconImage = (event) => {
    if (event.target.files[0]) {
      let file = event.target.files[0];
      let display = URL.createObjectURL(file);
      setDisImage(display);
      setImage(event.target.files[0]);
    }
  };
  const renderImages = (image) => {
    return (
      <img
        style={{ width: "110px", height: "140px" }}
        src={image}
        key={image}
      />
    );
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="row">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Cars
              </h5>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Edit Cars </label>
                  <div className="position-relative">
                    <input
                      type="text"
                      defaultValue={location.state.details?.cars}
                      className="form-control"
                      onChange={(e) => {
                        setCar(e.target.value);
                      }}
                    />
                    <div
                      className="hint_box"
                      style={{ display: "block" }}
                    ></div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Select Brand </label>
                  <Select
                    defaultValue={BrandValur.map((item) => {
                      console.log(item[1], "special");
                      return { value: item[0], label: item[1] };
                    })}
                    options={brandselect}
                    onChange={(e) => handleChangeBrand(e)}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Select Fuel </label>
                  <Select
                    isMulti
                    defaultValue={location.state.details?.fuel?.map((item) => {
                      console.log(item, "special");
                      return { value: item._id, label: item.fuel };
                    })}
                    key={location.state.details?.fuel?.map((item) => {
                      return item._id;
                    })}
                    options={fuelselect}
                    onChange={(e) => handleChangeFuel(e)}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Select CarCategory </label>
                  <Select
                    //   isMulti
                    defaultValue={CarCategoryValur.map((item) => {
                      console.log(item[1], "special");
                      return { value: item[0], label: item[1] };
                    })}
                    options={categoryselect}
                    onChange={(e) => handleChangeCategory(e)}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Select City </label>
                  <Select
                    defaultValue={CityValur.map((item) => {
                      console.log(item[1], "special");
                      return { value: item[0], label: item[1] };
                    })}
                    //   isMulti
                    options={cityData}
                    onChange={(e) => handleChangeCity(e)}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label d-block">Edit Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={IconImage}
                  />
                  {!disImage ? (
                    <img
                      className="mt-2"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      src={location.state.details?.image}
                    />
                  ) : (
                    renderImages(disImage)
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger CancelBtn"
                onClick={() => {
                  history.push("./Cars");
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={updateCarsData}
                className="btn submitBtn"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCars;
