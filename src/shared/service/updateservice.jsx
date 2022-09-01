import React, { useState } from "react";
import axios from "axios";
import "./service.css";
import Footer from "../../shared/Footer/footer";

const UpdateServie = (props) => {
    console.log(props,"props")
  const [Service, setService] = useState("");
  const [imageupdate, setImage] = useState("");
  
  function updateServiceData() {
    console.log(props,'update data')
    var data = JSON.stringify({
      'servicecategoryId': props.updatedData. _id,
      'servicecategory': Service == '' ? props.updatedData?.servicecategory : Service,
      'image': imageupdate == '' ? props.updatedData?.image : imageupdate,
     
    });
    console.log(data);

    var config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASEURL}/editService`,
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      data: data
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

  return (<>
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLabel">
        Edit Service
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
          <label className="form-label">Edit Service </label>
          <div className="position-relative">
            <input
              type="text"
              defaultValue={props.updatedData?.servicecategory}
              className="form-control"
              onChange={(e) => {
                setService(e.target.value)
              }}
            />
            <div
              className="hint_box"
              style={{ display: "block" }}
            ></div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mb-3">
          <label className="form-label">Update Image </label>
          <div className="position-relative">
            <input
              type="file"
              defaultValue={props.updatedData?.image}
              className="form-control"
              onChange={(e) => {
                                  setImage(e.target.files);
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
      <button type="button" className="btn btn-danger CancelBtn" data-bs-dismiss="modal"
      >Cancel</button>
      <button
        type="submit"
        onClick={updateServiceData}
        className="btn submitBtn" data-bs-dismiss="modal">
        Submit
      </button>
    </div>

  </>)
}

export default UpdateServie;