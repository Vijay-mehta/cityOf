import React, { useState } from "react";
import axios from "axios";

const UpdateScout = (props) => {
    
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setmobileNo] = useState("");
  const [city, setCity] = useState("");
  const [State, setState] = useState("");
  const [PinCode, setPinCode] = useState("");
  const [disImage, setDisImage] = useState("");
  const [image, setImage] = useState("");


  const [date, setDate] = useState("");


  
  function updateScoutData() {
   
    var data = new FormData();
    data.append("userid", props.updatedData?._id);
    data.append(
      "name", name === "" || null ? props.updatedData?.name  : name);
      data.append(
        "email", email === "" || null ? props.updatedData?.email  : email);
        data.append(
          "mobile", mobile === "" || null ? props.updatedData?.mobile  : mobile);
           
    data.append(
      "image",
      image === "" || null ? props.updatedData?.image : image
    );

    var config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASEURL}/UpdateScout`,
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        props.onEditDataFunction();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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
  return (<>
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLabel">
        Edit Scout
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
          <label className="form-label">Edit Name </label>
          <div className="position-relative">
            <input
              type="text"
              defaultValue={props.updatedData?.name}
              className="form-control"
              onChange={(e) => {
                setName(e.target.value)
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
          <label className="form-label">Edit Email Address </label>
          <div className="position-relative">
            <input
              type="text"
              defaultValue={props.updatedData?.email}
              className="form-control"
              onChange={(e) => {
                setEmail(e.target.value)
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
          <label className="form-label">Edit Mobile no </label>
          <div className="position-relative">
            <input
              type="text"
              defaultValue={props.updatedData?.mobile}
              className="form-control"
              onChange={(e) => {
                setmobileNo(e.target.value)
              }}
            />
            <div
              className="hint_box"
              style={{ display: "block" }}
            ></div>
          </div>
        </div>
      </div>

      {/* <div className="row">
        <div className="col-md-12 mb-3">
          <label className="form-label">Edit State </label>
          <div className="position-relative">
            <input
              type="text"
              defaultValue={props.updatedData?.State}
              className="form-control"
              onChange={(e) => {
                setState(e.target.value)
              }}
            />
            <div
              className="hint_box"
              style={{ display: "block" }}
            ></div>
          </div>
        </div>
      </div> */}
      {/* <div className="row">
        <div className="col-md-12 mb-3">
          <label className="form-label">Edit City </label>
          <div className="position-relative">
            <input
              type="text"
              defaultValue={props.updatedData?.city}
              className="form-control"
              onChange={(e) => {
                setCity(e.target.value)
              }}
            />
            <div
              className="hint_box"
              style={{ display: "block" }}
            ></div>
          </div>
        </div>
      </div> */}

      {/* <div className="row">
        <div className="col-md-12 mb-3">
          <label className="form-label">Edit PinCode </label>
          <div className="position-relative">
            <input
              type="text"
              defaultValue={props.updatedData?.PinCode}
              className="form-control"
              onChange={(e) => {
                setPinCode(e.target.value)
              }}
            />
            <div
              className="hint_box"
              style={{ display: "block" }}
            ></div>
          </div>
        </div>
      </div> */}

      
      <div className="row">
      <div className="col-md-12 mb-3">
            <label className="form-label d-block">Edit Image</label>
                <input type="file" className="form-control" onChange={IconImage} />
                {!disImage ? (
                  <img className="mt-2" 
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    src={props.updatedData?.image}
                  />
                ) : (
                  renderImages(disImage)
                )}
          </div>
        </div>
     
    </div>
    <div className="modal-footer">
      <button type="button" className="btn btn-danger CancelBtn" data-bs-dismiss="modal"
      >Cancel</button>
      <button
        type="submit"
        onClick={updateScoutData}
        className="btn submitBtn" data-bs-dismiss="modal">
        Submit
      </button>
    </div>

  </>)
}

export default UpdateScout;