import React from "react";
// import "./OderView.css";
import Header from "../../shared/Header/header";
import Sidebar from "../../shared/Sidebar/sidebar";
import { useLocation } from "react-router-dom";

import "./OrderView.css";

const OrderView = () => {
  let location = useLocation();
  console.log(location?.state?.detailone, "detailone");

  let arrayName;
  let arrayEmail;
  let arrayMobile;
  let arrayState;
  let arrayPinCode;
  let arrayStreet;
  let arrayImage;

  if (location.state.details.Scout_id) {
    arrayName = location.state.details.Scout_id.name;
    arrayEmail = location.state.details.Scout_id.email;
    arrayMobile = location.state.details.Scout_id.mobile;
    arrayState = location.state.details.Scout_id.State;
    arrayPinCode = location.state.details.Scout_id.PinCode;
    arrayStreet = location.state.details.Scout_id.Street;
    arrayImage = location.state.details.Scout_id.image;
  }

  let arrayCar;
  let arrayCity;
  let arrayFuel;
  let arrayBrand;

  if (location.state.details.car) {
    arrayCar = location.state.details.car.cars;
    arrayCity = location.state.details.city.city;
    arrayFuel = location.state.details.fuel.fuel;
    arrayBrand = location.state.details.brand.brands;
  }

  let arrayPlanName;
  let arrayTypeprice;
  let arrayTypename;
  let arrayServicepack;
  let arrayServicepackprice;
  let arrayServicename;

  if (location.state.details.Plans) {
    arrayPlanName = location.state.details.Plans.planName;
    arrayTypeprice = location.state.details.Plans.typeprice;
    arrayTypename = location.state.details.Plans.typename;
    arrayServicepack = location.state.details.Plans.servicepack;
    arrayServicepackprice = location.state.details.Plans.servicepackprice;
    arrayServicename = location.state.details.Plans.servicename;
  }

  let arrayBookName;
  let arrayBookCarno;
  let arrayBookContect;
  let arrayBookEmail;
  let arrayBookTime;
  let arrayBookDate;
  let arrayBookOptional;
  let arrayBookAddress;
  let arrayBookStreet;
  let arrayBookhouseNo;
  let arrayBookpincode;
  let arrayBookstate;

  if (location.state.details.bookingdata) {
    arrayBookName = location.state.details.bookingdata.name;
    arrayBookCarno = location.state.details.bookingdata.carno;
    arrayBookContect = location.state.details.bookingdata.contect;
    arrayBookEmail = location.state.details.bookingdata.email;
    arrayBookTime = location.state.details.bookingdata.time;
    arrayBookDate = location.state.details.bookingdata.date;
    arrayBookOptional = location.state.details.bookingdata.optional;
    arrayBookAddress = location.state.details.bookingdata.Address;
    arrayBookStreet = location.state.details.bookingdata.Street;
    arrayBookhouseNo = location.state.details.bookingdata.houseNo;
    arrayBookpincode = location.state.details.bookingdata.pincode;
    arrayBookstate = location.state.details.bookingdata.state;
  }

  // console.log(location.state.details,"66666")

  return (
    <>
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-4">
              <div className="col-md-6">
                <div className="userlist">
                  <h4 className="heading"> Scout Details</h4>

                  <ul>
                    <li>
                      <b> Name :-</b> {arrayName}
                    </li>
                    <li>
                      <b> email :-</b> {arrayEmail}
                    </li>
                    <li>
                      <b> mobile :-</b> {arrayMobile}
                    </li>
                    <li>
                      <b>State :-</b> {arrayState}
                    </li>
                    <li>
                      <b>PinCode :-</b> {arrayPinCode}
                    </li>
                    <li>
                      <b>Street :-</b> {arrayStreet}
                    </li>
                    <li>
                      <b>Image :- </b>
                      {<img src={arrayImage} width="80" height="90" />}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="userlist mt-4">
              <div className="row">
                <div className="col-md-6 pt-4">
                  <div>
                    <h4 className="heading"> User Details</h4>
                    <ul>
                      <li>
                        <b>Name :-</b> {arrayBookName}
                      </li>
                      <li>
                        <b>Car no :-</b> {arrayBookCarno}
                      </li>
                      <li>
                        <b>Contect :-</b> {arrayBookContect}
                      </li>
                      <li>
                        <b>Email :-</b> {arrayBookEmail}
                      </li>
                      <li>
                        <b>Date :-</b> {arrayBookTime}
                      </li>
                      <li>
                        <b>Date :-</b> {arrayBookDate}
                      </li>
                      <li>
                        <b>Remarks :-</b> {arrayBookOptional}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6 pt-4">
                  <div>
                    <h4 className="heading">Address</h4>

                    <ul>
                      <li>
                        <b>Order Address :-</b>
                        {arrayBookAddress}
                      </li>
                      <li>
                        <b>Street :-</b> {arrayBookStreet}
                      </li>
                      <li>
                        <b>HouseNo :-</b> {arrayBookhouseNo}
                      </li>
                      <li>
                        <b>pincode :-</b> {arrayBookpincode}
                      </li>
                      <li>
                        <b>State :-</b> {arrayBookstate}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="userlist mt-4">
              <div className="row">
                <div className="col-md-6 pt-4">
                  <div>
                    <h4 className="heading"> plan Details </h4>
                    <ul>
                      <li>
                        <b> Name :-</b> {arrayPlanName}
                      </li>
                      <li>
                        <b> Price :-</b> {arrayTypeprice}
                      </li>
                      <li>
                        <b> Type Name :-</b> {arrayTypename}
                      </li>
                      <li>
                        <b>Service Pack :-</b> {arrayServicepack}
                      </li>
                      <li>
                        <b>Service Pack Price :-</b> {arrayServicepackprice}
                      </li>
                      <li>
                        <b>Service Type Name :-</b> {arrayServicename}
                      </li>
                    
                    </ul>
                  </div>
                </div>
                <div className="col-md-6 pt-4">
                  <div>
                    <h4 className="heading">Car Detail</h4>

                    <ul>
                      <li>
                        <b> Name :-</b>
                        {arrayCar}
                      </li>
                      <li>
                        <b>City :-</b> {arrayCity}
                      </li>
                      <li>
                        <b>Fuel :-</b> {arrayFuel}
                      </li>
                      <li>
                        <b>Brand :-</b> {arrayBrand}
                      </li>
                    
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderView;
