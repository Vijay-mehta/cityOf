import React, { useState } from "react";
import axios from "axios";
import "./Category.css";
import Footer from "../../shared/Footer/footer";

const UpdateCategory = (props) => {
    
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [discreption, setDiscreption] = useState("");
  const [disImage, setDisImage] = useState("");


  
  function updateCategoryData() {
    console.log(props.updatedData,"123456789")
    var data = new FormData();
    data.append("categoryid", props.updatedData?._id);
    data.append(
      "title", title === "" || null ? props.updatedData?.title  : title);
     
     data.append(
        "discreption", discreption === "" || null ? props.updatedData?.discreption  : discreption);
      data.append(
        "image",
        image === "" || null ? props.updatedData?.image : image
      );
  
    var config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASEURL}/editCategory`,
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
        Edit Category
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
              defaultValue={props.updatedData?.title}
              className="form-control"
              onChange={(e) => {
                setTitle(e.target.value)
              }}
            />
            <div
              className="hint_box"
              style={{ display: "block" }}
            ></div>
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
                setDiscreption(e.target.value)
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
        onClick={updateCategoryData}
        className="btn submitBtn" data-bs-dismiss="modal">
        Submit
      </button>
    </div>

  </>)
}

export default UpdateCategory;