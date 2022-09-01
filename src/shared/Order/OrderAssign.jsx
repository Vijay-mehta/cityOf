import React, { useState, useEffect } from "react";
import Header from "../../shared/Header/header";
import Sidebar from "../../shared/Sidebar/sidebar";
import Select from "react-select";
import Footer from "../Footer/footer";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./OrderAssign.css";

function OrderAssign() {
  let location = useLocation();
  let history = useHistory();

  const [rowData, setRowData] = useState([]);
  const [scout, setScout] = useState([]);
  let ScoutValur = [];

  if (location.state?.details.Scout_id) {
    const propertyNames = Object.values(location.state?.details.Scout_id);
    ScoutValur.push(propertyNames);
  }

  console.log(location.state.details, "data");
  const orderId = location.state.details._id;

  function OrderAssignPost() {
    // let typeprice = [{price:planPrice, typename:planHeadingPrice}]
    // let servicepackprice = [{price:subPlanPrice, servicename:subPlanHeadingPrice}]
    // let timming =[{hours:time, month:month}]
    //  console.log(servicepackprice,"planHeading")

    var data = JSON.stringify({
      order_id: orderId,
      scout_id: scout,
    });
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/aloteorder`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response, "9999");
        history.push("/Order");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    scoutGet();
  }, []);

  // ------GET SCOUT API-------//

  function scoutGet() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/GetScout`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response, "getuser");
        let scoutArr = [];
        response.data.data.map((item) => {
          scoutArr.push({ value: item._id, label: item.name });
        });

        setRowData(scoutArr);
        console.log(scoutArr, "scoutArr");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleChangeScout = (e) => {
    setScout(e.value);
  };
  return (
    <>
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="card">
            <div className="card-body assign">
              <h4 className="card-title">Order Assign</h4>
              <div className="branchData">
                <div className="row">
                  <div className="row bgBox ">
                    <div className="col-md-10 mb-3">
                      <label className="form-label">Select Scout </label>

                      <Select
                        //  defaultValue={location.state.details.Scout_id.name}
                        defaultValue={ScoutValur.map((item) => {
                          if (item) {
                            return { value: item[11], label: item[3] };
                          } else {
                            return;
                          }
                        })}
                        options={rowData}
                        onChange={(e) => handleChangeScout(e)}
                        className="basic-multi-select"
                        classNamePrefix="select"
                      />
                    </div>
                  </div>

                  <div class="col-md-12">
                    <button
                      type="button"
                      class="btn CancelBtn me-3"
                      onClick={() => {
                        history.push("./Order");
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      class="btn submitBtn me-3"
                      onClick={OrderAssignPost}
                    >
                      Assign
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

export default OrderAssign;
