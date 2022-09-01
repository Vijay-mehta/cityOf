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


function Addplan() {

  const [CatSelect, setcatChang] = useState("");
  const [catId, setCaeId] = useState("");
  const [subCatChang, setSubCatChang] = useState([]);
  const [seubCatId, setSubCatId] = useState([]);
  const [label, setLabel] = useState("");
  const [planHeading, setPlanHeading] = useState("");
  const [planPrice, setplanPrice] = useState("");
  const [planHeadingPrice, setplanHeadingPrice] = useState("");
  const [subPlanHeading, setSubPlanHeading] = useState("");
  const [subPlanHeadingPrice, setSubPlanHeadingPrice] = useState("");
  const [subPlanPrice, setSubPlanPrice] = useState("");
  const [time, setTime] = useState("");
  const [month, setMonth] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [headingDes, setHeadingDes] = useState("");
  const [textField, setTextField] = useState("");
  const [serviceData, setServiceData] = useState("");
  const [services_id, setServiceId] = useState("");


  
// console.log(subPlanHeading,"label")
let history = useHistory();

function addPlanService() {

// let typeprice = [{price:planPrice, typename:planHeadingPrice}]
// let servicepackprice = [{price:subPlanPrice, servicename:subPlanHeadingPrice}]
// let timming =[{hours:time, month:month}]
//  console.log(servicepackprice,"planHeading")

    var data = JSON.stringify({
      "Category":catId,
      "Subcategory":seubCatId,
      "services_id":services_id,
      "label": label,
      "planName":planHeading,
      "servicepack":subPlanHeading,
      "description":shortDescription,
      "hours":time,
      "month":month,
      "typename":planHeadingPrice,
      "typeprice":planPrice,
      "servicename":subPlanHeadingPrice,
      "servicepackprice":subPlanPrice,
      "heading":headingDes,
      "textField":textField
      
    });
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/CommonService`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response,"9999")
        history.push("/Plan")
        
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
    getCategory();
    subCategoryGet();
    getService();
  }, []);


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
        console.log(response.data,"catget")
        let arrCat=[];
        response.data.getdata.map((catName)=>{
          arrCat.push({label: catName.title,value: catName._id})
        });

        setcatChang(arrCat);
        // setCategorySelect(response.data.getdata);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleChangeCategory=(e)=>{
    console.log(e.label,"element")
   setCaeId(e.value)
    }

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
            console.log(response,"subcategory")   
            
            let arrSubCat=[];
            response.data.data.map((catSubName)=>{
              arrSubCat.push({label: catSubName.title,value: catSubName._id})
            });
            setSubCatChang(arrSubCat);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    const handleChangeSubCategory=(e)=>{
     let subarrSelect=[];
     e.forEach((value)=>{
      subarrSelect.push(value.value)
     })
     setSubCatId(subarrSelect)
     
      }
  
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
        console.log(response.data.data,"GERSERVICE")
        let arrServicePart =[];
        response.data.data.map((item)=>{
          // console.log(item)
          arrServicePart.push({label: item.title,value: item._id})
        })
        
        setServiceData(arrServicePart);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const handleChangeService=(e)=>{

    let serviceArrSelect=[];
    e.forEach((value)=>{
      serviceArrSelect.push(value.value)
    })
    setServiceId(serviceArrSelect)
 console.log(serviceArrSelect,"aaaaa")
  //  setServiceId(e.value)
    }


  return (
    <>
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Add Plan</h4>
              <div className="branchData">
                <div className="row">
                  <div className="row bgBox ">
                    <div className="col-md-10 mb-3">
                      <label className="form-label">Select Category </label>
                      <Select
                              // isMulti
                              options={CatSelect}
                              onChange={(e) => handleChangeCategory(e)}
                              className="basic-multi-select"
                              classNamePrefix="select"
                            />
                    </div>
                  </div>
                  <div className="row bgBox ">
                    <div className="col-md-10 mb-3">
                      <label className="form-label">Select Sub Category </label>
                      <Select
                              isMulti
                              options={subCatChang}
                              onChange={(e) => handleChangeSubCategory(e)}
                              className="basic-multi-select"
                              classNamePrefix="select"
                            />
                    </div>
                  </div>

                  <div className="row bgBox ">
                    <div className="col-md-10 mb-3">
                      <label className="form-label">Select Service Parts </label>
                      <Select
                              isMulti
                              options={serviceData}
                              onChange={(e) => handleChangeService(e)}
                              className="basic-multi-select"
                              classNamePrefix="select"
                            />
                    </div>
                  </div>
                  <div className="row bgBox ">
                    <div className="col-md-10">
                      <div className="col-md-12 mb-3">
                        <label className="form-label"> Plan label</label>
                        <input
                          value={label}
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                              setLabel(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row bgBox ">
                    <div className="col-md-10">
                      <div className="col-md-12 mb-3">
                        <label className="form-label">Plan Heading</label>
                        <input
                           value={planHeading}
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                               setPlanHeading(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row bgBox ">
                    <div className="col-md-10">
                      <div className="col-md-12 mb-3">
                        <label className="form-label"> Plan Heading Price</label>
                        <input
                           value={planHeadingPrice}
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                             setplanHeadingPrice(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row bgBox ">
                    <div className="col-md-10">
                      <div className="col-md-12 mb-3">
                        <label className="form-label"> Plan Price</label>
                        <input
                           value={planPrice}
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            setplanPrice(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row bgBox ">
                    <div className="col-md-10">
                      <div className="col-md-12 mb-3">
                        <label className="form-label"> Plan Sub Heading </label>
                        <input
                           value={subPlanHeading}
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                               setSubPlanHeading(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row bgBox ">
                    <div className="col-md-10">
                      <div className="col-md-12 mb-3">
                        <label className="form-label"> plan Sub Heading Price</label>
                        <input
                           value={subPlanHeadingPrice}
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                              setSubPlanHeadingPrice(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row bgBox ">
                    <div className="col-md-10">
                      <div className="col-md-12 mb-3">
                        <label className="form-label"> plan Sub Price</label>
                        <input
                           value={subPlanPrice}
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            setSubPlanPrice(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row bgBox ">
                    <div className="col-md-10">
                      <div className="col-md-12 mb-3">
                        <label className="form-label">Time</label>
                        <input
                           value={time}
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                              setTime(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row bgBox ">
                    <div className="col-md-10">
                      <div className="col-md-12 mb-3">
                        <label className="form-label">Month</label>
                        <input
                           value={month}
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                              setMonth(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row bgBox ">
                    <div className="col-md-10">
                      <div className="col-md-12 mb-3">
                        <label className="form-label">Short Description</label>
                        <input
                           value={shortDescription}
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                              setShortDescription(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row bgBox ">
                    <div className="col-md-10">
                      <div className="col-md-12 mb-3">
                        <label className="form-label">Heading</label>
                        <input
                           value={headingDes}
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                              setHeadingDes(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    
                  </div>
                  <div className="row bgBox ">
                    <div className="col-md-10">
                      <div className="col-md-12 mb-3">
                        <label className="form-label">Text Field</label>
                        <input
                           value={textField}
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                              setTextField(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    
                  </div>
                  <div className="col-md-12">
                    <div className="row bgBox mb-3">
                      <div className="col-md-10">
                        {/* <div className="col-md-12">
                          <label className="form-label">Article Subject</label>
                          <input
                            // value={subject}
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                              //   setSubject(e.target.value);
                            }}
                          />
                        </div> */}
                      </div>
                      {/* <div className="col-md-12 mt-3">
                        <label className="form-label">
                          Article Brief Description
                        </label>
                        <textarea
                          type="textarea"
                          //value={articledescription}
                          className="form-control"
                          onChange={(e) => {
                            //   setArticledescription(e.target.value);
                          }}
                        />
                      </div> */}
                    </div>
                  </div>

                  {/* <div className="col-md-12">
                    <div className="row bgBox mb-3">
                      <div className="col-md-12 mb-3">
                        <label className="form-label"> Select Tags </label>
                        <Select
                          isMulti
                          //   options={options}
                          //   onChange={(e) => handlechangetag(e)}
                        />
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="col-md-12">
                    <div className="row bgBox mb-3">
                      <div className="col-md-12 mb-3">
                        <label className="form-label">Select Group</label>
                        <Select
                          isMulti
                          //    options={optionsgroup}
                          //    onChange={(e) => handlechangegroupmulti(e)}
                        />
                      </div>
                    </div>
                  </div> */}

                  <div class="col-md-12">
                    <button
                      type="button"
                      class="btn CancelBtn me-3"
                       onClick={()=>
                          {history.push("./Plan")}}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      class="btn submitBtn me-3"
                        onClick={addPlanService}
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

export default Addplan;
