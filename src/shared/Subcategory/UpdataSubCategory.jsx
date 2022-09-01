import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

// import "./Category.css";
import Footer from "../../shared/Footer/footer";

const UpdataSubCategory = (props) => {
  console.log(props,"props")
  const [title, setTitle] = useState("");
  const [parentsid, setparentsid] = useState("");
  const [discreption, setDiscreption] = useState("");
  const [Plan, setPlan] = useState([]);
  const [plan_id, setPlanId] = useState([]);

  function updateSubCategory() {

    var data = JSON.stringify({
      'categoryid': props.updatedData?._id,
      'parentsid': parentsid === '' || null ? props.updatedData?.parentsid : parentsid,
      'title': title === '' || null ? props.updatedData?.title : title,
      'discreption': discreption === '' || null ? props.updatedData?.discreption : discreption,

      'plan_id':plan_id.toString() === '' || null ? props.updatedData?.plan_id?.map((item) => { return item._id }).toString() : plan_id
     });
    
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/updateSubCategory`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // window.location.reload(false);
        props.onEditDataFunction();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getPlanService();
  }, []);

  //---PLAN GET API--//

  function getPlanService() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getCommonService`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response, "plan");
        let planarr = [];
        response.data.data.map((item) => {
          planarr.push({ label: item.planName, value: item._id });
        });
        console.log(planarr, "planarr");
        setPlan(planarr);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleChangePlan = (e) => {
    let selsctArrChange = [];
    e.forEach((item) => {
      selsctArrChange.push(item.value);
    });
    setPlanId(selsctArrChange);
    
  };

  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Edit Sub Category
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body">
        <div className="row">
          <div className="col-md-12 mb-3">
            <label className="form-label">Edit Category </label>
            <div className="position-relative">
              <input
                type="text"
                defaultValue={props.updatedData?.parentsid}
                className="form-control"
                onChange={(e) => {
                  setparentsid(e.target.value);
                }}
              />
              <div className="hint_box" style={{ display: "block" }}></div>
            </div>
          </div>

          <div className="col-md-12 mb-3">
            <label className="form-label">Edit Plan</label>
            <div className="position-relative">
              <Select
                isMulti
                defaultValue={props.updatedData?.plan_id?.map((item) => { 
                  console.log(item,"special")
                  return { value: item._id, label: item.planName } })}
                  key={props.updatedData?.plan_id?.map((item) => { return item._id })}

              
               
                options={Plan}
                // onChange={(e) => handleChangePlan(e)}

                onChange={(e) => {
                  e.persist = () => { }
                  handleChangePlan(e)
              }}

                className="basic-multi-select"
                classNamePrefix="select"
              />
              <div className="hint_box" style={{ display: "block" }}></div>
            </div>
          </div>

          <div className="col-md-12 mb-3">
            <label className="form-label">Edit Sub Category </label>
            <div className="position-relative">
              <input
                type="text"
                defaultValue={props.updatedData?.title}
                className="form-control"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <div className="hint_box" style={{ display: "block" }}></div>
            </div>
          </div>

          <div className="col-md-12 mb-3">
            <label className="form-label">Edit Discreption </label>
            <div className="position-relative">
              <input
                type="text"
                defaultValue={props.updatedData?.discreption}
                className="form-control"
                onChange={(e) => {
                  setDiscreption(e.target.value);
                }}
              />
              <div className="hint_box" style={{ display: "block" }}></div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-danger CancelBtn"
          data-bs-dismiss="modal"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={updateSubCategory}
          className="btn submitBtn"
          data-bs-dismiss="modal"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default UpdataSubCategory;
