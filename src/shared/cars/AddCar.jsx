
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Select from "react-select";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Footer from "../Footer/footer";
import Sidebar from "../Sidebar/sidebar";
import Header from "../Header/header";
import { useHistory } from "react-router-dom";
import { Value } from "sass";


function AddCar() {

    const [cars, setcars] = useState("");
    const [addimage, setimage] = useState("");
    const [brandselect, setBrandSelect] =useState([]);
    const [brandChang, setBrandChang] =useState("");
    const [fuelselect, setFuelSelect] =useState([]);
    const [fuelChange, setFuelChange] =useState([]);
    const [categoryselect, setCategoryselect] =useState([]);
    const [carCategoryChange, setCarCategoryChange] =useState("")
    const [cityData, setCityData] =useState([]);
  const [CityId, setCityId] =useState("")

// console.log(subPlanHeading,"label")
let history = useHistory();

function addCarMaster() {
   
    var data = new FormData();
    data.append("cars", cars);
    data.append("image", addimage);
    data.append("brand", brandChang);
    data.append("fuel", fuelChange);
    data.append("carCategory", carCategoryChange);
    data.append("city",CityId)
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/car`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
      
        console.log(response.data);
        history.push("/Cars")
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const config = {
    readonly: false,
    height: 400,
  };


  useEffect(() => {
    //  getCars();
     brandGet();
     fuelGet();
     carCategoryGet();
      getCity()
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
          console.log(response.data.data,"brandselect")

          let arrBrand=[];
          response.data.data.map((brandName)=>{
            console.log(brandName.brands,"123")
            arrBrand.push({label: brandName.brands,value: brandName._id})
          });
          setBrandSelect(arrBrand)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleChangeBrand=(e)=>{
    console.log(e.label,"label")
setBrandChang(e.value)
  }

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
          console.log(response.data,"fuelselsct")
        
          let arrFuel=[];
          response.data.data.map((fuelName)=>{
            arrFuel.push({label: fuelName.fuel,value: fuelName._id})
          });
  
          setFuelSelect(arrFuel);
        // setFuelSelect(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleChangeFuel=(event)=>{
  let fuelArraySelect =[];
  event.forEach((item)=>{
    // console.log(item.label,"item")
    fuelArraySelect.push(item.value)
  })
   setFuelChange(fuelArraySelect)
   console.log(fuelArraySelect,"car")
  }


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
          console.log(response.data.data,"6768627")

          let arrCategory=[];
          response.data.data.map((categoryName)=>{
            arrCategory.push({label: categoryName.carCategory,value: categoryName._id})
          });
  
          setCategoryselect(arrCategory);
        
        //  setCategoryselect(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
const handleChangeCategory =(e)=>{
  console.log(e.label,"cat")
  setCarCategoryChange(e.value)
}

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
        console.log(response.data,"city")
     
        let arrCity=[];
        response.data.data.map((item)=>{
          arrCity.push({label:item.city, value:item._id})
        })
        console.log(arrCity,"arrCity")
         setCityData(arrCity);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  const handleChangeCity=(e)=>{
  setCityId(e.value)
  }




  return (
    <>
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Add Car</h4>
              <div className="branchData">
                <div className="row">
                  <div className="row bgBox ">
                  <div className="col-md-10 mb-3">
                            <label className="form-label">Car Name</label>
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control"
                                value={cars}
                                onChange={(e) => {
                                  setcars(e.target.value);
                                }}
                              />
                              <div
                                className="hint_box"
                                style={{ display: "block" }}
                              ></div>
                            </div>
                          </div>
                    <div className="col-md-10 mb-3">
                      <label className="form-label">Select Brand </label>
                      <Select
                              // isMulti
                              options={brandselect}
                              onChange={(e) => handleChangeBrand(e)}
                              className="basic-multi-select"
                              classNamePrefix="select"
                            />
                    </div>
                  </div>
                  <div className="row bgBox ">
                    <div className="col-md-10 mb-3">
                      <label className="form-label">Select Fuel </label>
                      <Select
                              isMulti
                              options={fuelselect}
                              onChange={(e) => handleChangeFuel(e)}
                              className="basic-multi-select"
                              classNamePrefix="select"
                            />
                    </div>
                  </div>

                  <div className="row bgBox ">
                    <div className="col-md-10 mb-3">
                      <label className="form-label">Select CarCategory </label>
                      <Select
                            //   isMulti
                              options={categoryselect}
                              onChange={(e) => handleChangeCategory(e)}
                              className="basic-multi-select"
                              classNamePrefix="select"
                            />
                    </div>
                  </div>

                  <div className="row bgBox ">
                    <div className="col-md-10 mb-3">
                      <label className="form-label">Select City </label>
                      <Select
                            //   isMulti
                              options={cityData}
                              onChange={(e) => handleChangeCity(e)}
                              className="basic-multi-select"
                              classNamePrefix="select"
                            />
                    </div>
                  </div>
                  <div className="row bgBox ">
                  <div className="col-md-10 mb-3">
                            <label className="form-label">image</label>
                            <div className="position-relative">
                              <input
                                type="file"
                                className="form-control"
                               
                                onChange={(e) => {
                                  setimage(e.target.files[0]);
                                 }}
                              />
                            </div>
                          </div>
                  </div>

                  <div class="col-md-12">
                    <button
                      type="button"
                      class="btn CancelBtn me-3"
                    //    onClick={()=> {history.push("./Plan")}}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      class="btn submitBtn me-3"
                         onClick={addCarMaster}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AddCar;
