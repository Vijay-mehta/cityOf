import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import Header from "../../shared/Header/header";
import Sidebar from "../../shared/Sidebar/sidebar";
import "./PlanUpdate.css";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

// import "./Category.css";
import Footer from "../../shared/Footer/footer";

const PlanUpdate = (props) => {
  let location = useLocation();
   console.log(location.state.details, "111111");

  console.log(props, "props");
  const [subCatChang, setSubCatChang] = useState([]);
  const [seubCatId, setSubCatId] = useState([]);
  const [catId, setCaeId] = useState("");
  const [CatSelect, setcatChang] = useState("");
  const [serviceData, setServiceData] = useState([]);
  const [services_id, setServiceId] = useState([]);
  const [label, setLabel] = useState("");
  const [planHeading, setPlanHeading] = useState("");
  const [subPlanHeading, setSubPlanHeading] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [time, setTime] = useState("");
  const [month, setMonth] = useState("");
  const [planPrice, setplanPrice] = useState("");
  const [planHeadingPrice, setplanHeadingPrice] = useState("");
  const [subPlanHeadingPrice, setSubPlanHeadingPrice] = useState("");
  const [subPlanPrice, setSubPlanPrice] = useState("");
  const [headingDes, setHeadingDes] = useState("");
  const [textField, setTextField] = useState("");


  let history = useHistory();

function updatePlan() {


// let typeprice = [{price:planPrice, typename:planHeadingPrice}]
// let servicepackprice = [{price:subPlanPrice, servicename:subPlanHeadingPrice}]
// let timming =[{hours:time, month:month}]

var data = JSON.stringify({
  'CommanserviceId': location.state.details?._id,
  'Category': catId === '' || null ? location.state.details?.Category?.catId : catId,
  'Subcategory':seubCatId.toString() === '' || null ? location.state.details?.Subcategory?.map((item) => { return item._id }).toString() : seubCatId,
  'services_id':services_id.toString() === '' || null ? location.state.details?.services_id?.map((item) => { return item._id }).toString() : services_id,

  'label': label === '' || null ? location.state.details?.label : label,
  'planName': planHeading === '' || null ? location.state.details?.planName : planHeading,
  'servicepack': subPlanHeading === '' || null ? location.state.details?.servicepack : subPlanHeading,
  'description': shortDescription === '' || null ? location.state.details?.description : shortDescription,
  'hours': time === '' || null ? location.state.details?.hours: time,
  'month': month === '' || null ? location.state.details?.month : month,

  'typename': planHeadingPrice === '' || null ? location.state.details?.typename : planHeadingPrice,
  'typeprice': planPrice === '' || null ? location.state.details?.typeprice : planPrice,


  'servicename': subPlanHeadingPrice === '' || null ? location.state.details?.servicename : subPlanHeadingPrice,
  'servicepackprice': subPlanPrice === '' || null ? location.state.details?.servicepackprice : subPlanPrice,

  'heading': headingDes === '' || null ? location.state.details?.heading : headingDes,
  'textField': textField === '' || null ? location.state.details?.textField : textField,






 });

  
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/EditCommonServic`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // window.location.reload(false);
        history.push("/Plan")
        props.onEditDataFunction();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    subCategoryGet();
    getCategory();
    getService();
  }, []);

  function subCategoryGet() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/get-sub-category`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response, "subcategory");

        let arrSubCat = [];
        response.data.data.map((catSubName) => {
          arrSubCat.push({ label: catSubName.title, value: catSubName._id });
        });
        setSubCatChang(arrSubCat);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleChangeSubCategory = (e) => {
    let subarrSelect = [];
    e.forEach((item) => {
      subarrSelect.push(item.value);
    });
    setSubCatId(subarrSelect);
  };

  function getCategory() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getcategory`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response.data, "catget");
        let arrCat = [];
        response.data.getdata.map((catName) => {
          arrCat.push({ label: catName.title, value: catName._id });
        });

        setcatChang(arrCat);
        // setCategorySelect(response.data.getdata);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleChangeCategory = (e) => {
    console.log(e.value, "element");
    setCaeId(e.value);
  };

  // ------GET SERVICE API-------//

  function getService() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getservice`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response.data.data, "GERSERVICE");
        let arrServicePart = [];
        response.data.data.map((item) => {
          // console.log(item)
          arrServicePart.push({ label: item.title, value: item._id });
        });

        setServiceData(arrServicePart);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const handleChangeService = (e) => {
    let serviceArrSelect = [];
    e.forEach((item) => {
      serviceArrSelect.push(item.value);
    });
    setServiceId(serviceArrSelect);
    console.log(serviceArrSelect, "aaaaa");
    //  setServiceId(e.value)
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
                Edit Plan
              </h5>
              {/* <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button> */}
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Edit Category </label>
                  <div className="position-relative">
                    <Select
                      defaultValue={location.state.details?.Category?.map(
                        (item) => {
                          console.log(item, "565");
                          return { value: item._id, label: item.title };
                        }
                      )}
                      key={location.state.details?.Category?.map((item) => {
                        return item._id;
                      })}
                     options={CatSelect}
                     
                      onChange={(e) => {
                        handleChangeCategory(e);
                      }}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                    <div
                      className="hint_box"
                      style={{ display: "block" }}
                    ></div>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Edit Sub Category</label>
                  <div className="position-relative">
                    <Select
                      isMulti
                      // defaultValue={location.state.details?.Subcategory}

                      defaultValue={location.state.details?.Subcategory?.map(
                        (item) => {
                          console.log(item, "565");
                          return { value: item._id, label: item.title };
                        }
                      )}
                      key={location.state.details?.Subcategory?.map((item) => {
                        return item._id;
                      })}
                      options={subCatChang}
                      // onChange={(e) => handleChangePlan(e)}

                      onChange={(e) => {
                        e.persist = () => {};
                        handleChangeSubCategory(e);
                      }}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                    <div
                      className="hint_box"
                      style={{ display: "block" }}
                    ></div>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Edit Service parts </label>
                  <Select
                     defaultValue={location.state.details?.services_id?.map(
                      (item) => {
                        console.log(item, "565");
                        return { value: item._id, label: item.title };
                      }
                    )}
                    key={location.state.details?.services_id?.map((item) => {
                      return item._id;
                    })}
                    isMulti
                    options={serviceData}
                    onChange={(e) => handleChangeService(e)}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Edit Plan Label </label>
                  <div className="position-relative">
                    <input
                      type="text"
                      defaultValue={location.state.details?.label}
                      className="form-control"
                      onChange={(e) => {
                        setLabel(e.target.value);
                    }}
                    />
                    <div
                      className="hint_box"
                      style={{ display: "block" }}
                    ></div>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Edit Plan Heading </label>
                  <div className="position-relative">
                    <input
                      type="text"
                      defaultValue={location.state.details?.planName}
                      className="form-control"
                      onChange={(e) => {
                        setPlanHeading(e.target.value);
                      }}
                    />
                    <div
                      className="hint_box"
                      style={{ display: "block" }}
                    ></div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    {" "}
                    Edit Plan Heading Price{" "}
                  </label>
                  <div className="position-relative">
                    <input
                      type="text"
                      defaultValue={location.state.details?.typename}


                      className="form-control"
                      onChange={(e) => {
                        setplanHeadingPrice(e.target.value);
                      }}
                    />
                    <div
                      className="hint_box"
                      style={{ display: "block" }}
                    ></div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Edit Plan Price </label>
                  <div className="position-relative">
                    <input
                      type="text"
                      defaultValue={location.state.details?.typeprice}

                      className="form-control"
                      onChange={(e) => {
                        setplanPrice(e.target.value);
                      }}
                    />
                    <div
                      className="hint_box"
                      style={{ display: "block" }}
                    ></div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Edit Plan Sub Heading</label>
                  <div className="position-relative">
                    <input
                      type="text"
                      defaultValue={location.state.details?.servicepack}
                      className="form-control"
                      onChange={(e) => {
                        setSubPlanHeading(e.target.value);
                      }}
                    />
                    <div
                      className="hint_box"
                      style={{ display: "block" }}
                    ></div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Edit plan Sub Heading Price
                  </label>
                  <div className="position-relative">
                    <input
                      type="text"
                      defaultValue={location.state.details?.servicename}

                      className="form-control"
                      onChange={(e) => {
                        setSubPlanHeadingPrice(e.target.value);
                      }}
                    />
                    <div
                      className="hint_box"
                      style={{ display: "block" }}
                    ></div>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Edit plan Sub Price</label>
                  <div className="position-relative">
                    <input
                      type="text"
                      defaultValue={location.state.details?.servicepackprice}

                      className="form-control"
                      onChange={(e) => {
                        setSubPlanPrice(e.target.value);
                      }}
                    />
                    <div
                      className="hint_box"
                      style={{ display: "block" }}
                    ></div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Edit Time </label>
                  <div className="position-relative">
                    <input
                      type="text"
                      defaultValue={location.state.details?.hours}

                      className="form-control"
                      onChange={(e) => {
                        setTime(e.target.value);
                      }}
                    />
                    <div
                      className="hint_box"
                      style={{ display: "block" }}
                    ></div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Edit Month </label>
                  <div className="position-relative">
                    <input
                      type="text"
                      defaultValue={location.state.details?.month}

                      className="form-control"
                      onChange={(e) => {
                        setMonth(e.target.value);
                      }}
                    />
                    <div
                      className="hint_box"
                      style={{ display: "block" }}
                    ></div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Edit Short Description </label>
                  <div className="position-relative">
                    <input
                      type="text"
                      defaultValue={location.state.details?.description}
                      className="form-control"
                      onChange={(e) => {
                        setShortDescription(e.target.value);
                    }}
                    />
                    <div
                      className="hint_box"
                      style={{ display: "block" }}
                    ></div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Edit Heading </label>
                  <div className="position-relative">
                    <input
                      type="text"
                      defaultValue={location.state.details?.heading}
                      className="form-control"
                      onChange={(e) => {
                        setHeadingDes(e.target.value);
                      }}
                    />
                    <div
                      className="hint_box"
                      style={{ display: "block" }}
                    ></div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Edit Text Field </label>
                  <div className="position-relative">
                    <input
                      type="text"
                      defaultValue={location.state.details?.textField}
                      className="form-control"
                      onChange={(e) => {
                        setTextField(e.target.value);
                      }}
                    />
                    <div
                      className="hint_box"
                      style={{ display: "block" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger CancelBtn"
                onClick={() => { history.push("./Plan") }}
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={updatePlan}
                className="btn submitBtn"
                // data-bs-dismiss="modal"
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

export default PlanUpdate;
