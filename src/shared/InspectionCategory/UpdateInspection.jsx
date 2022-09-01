import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

// import "./Category.css";
import Footer from "../../shared/Footer/footer";

const UpdateInspection = (props) => {
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



  //---PLAN GET API--//





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
            <label className="form-label">Edit Sub Category </label>
            <div className="position-relative">
              <input
                type="text"
                defaultValue={props.updatedData?.InspectionCategory}
                className="form-control"
                onChange={(e) => {
                  setTitle(e.target.value);
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
          onClick={UpdateInspection}
          className="btn submitBtn"
          data-bs-dismiss="modal"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default UpdateInspection;
