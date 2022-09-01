
import React, {useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import UpdateCarCategory from './UpdateCarCategory'

import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import Header from "../Header/header";
import Sidebar from "../Sidebar/sidebar";
import { AiFillEye } from "react-icons/ai";

function CarCategory() {
  const [DeleteDeleteId,setDeleteDeleteId] = useState("")
  const [UpdateCarCategoryData, setUpdateCarCategoryData] = useState({});
  const [viewCategory, setViewCategory] = useState([]);
  const [CarCategoryData, setCarCategoryData] = useState("");
  const [image, setImage] = useState("");

  const [rowData, setRowData] = useState([]);
  const pagination = true;
//   const paginationPageSize = 10;
//   const rowHeight = 55;

 


  const SrNoRenderer = (props) => {
    return (
      <>
        <span>{props.node.rowIndex + 1}</span>
      </>
    );
  };

  

  const ImageRender = (props) => {
    return (
      // <img src={props.data.image}/>
      <span className="profle_img_box">
      <img className="profile_img_table" src={props.data.image} alt="icon" />
    </span>
    )
  }
  const ChildMessageRenderer = (props) => {
    return (
      <div className="iconActionList">
        <div className="editIcon"
        onClick={() => {
          setUpdateCarCategoryData(props.data);
      }}
      data-bs-toggle="modal"
      data-bs-target="#UpdateStudentsData"
        >
          <MdModeEditOutline
        
            className="ActionIcon viewicon"
            
          />
        </div>
        <div className="ViewIcon"
         onClick={() => {
          setViewCategory(props.data);
        }}
        data-bs-toggle="modal"
        data-bs-target="#UserViewId"
        >
          <AiFillEye
           
            alt=""
            src="../../images/view.jpg"
          />
        </div>
        <div className="DeleteIcon"
        onClick={() => {
          setDeleteDeleteId(props.data._id);
        }}
        data-bs-toggle="modal"
        data-bs-target="#DeleteCarCategoryData"
        >
          <AiFillDelete
            className="ActionIcon"
            
          />
        </div>
      </div>
    );
  };

  // ------Post API-------//

  function addCarCategory() {
    var data = new FormData();
  
    data.append("carCategory", CarCategoryData);
    data.append("image", image);

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/addcarCategory`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response,"response")
       carCategoryGet();
       resetForm();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const resetForm = () => {
		setCarCategoryData('');
		setImage('');
	  };
  useEffect(() => {
    carCategoryGet()
  }, []);

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
        console.log(response,"12233")      
        setRowData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  function CarCategoryDelete(id) {
    var data = JSON.stringify({
        carCategoryid: id,
    });
    console.log(data);

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/deleteCarCategory`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        carCategoryGet()
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  const editdataReloadFunc = () => {
    carCategoryGet()
  };

  
  const StatusRenderer = (props) => {
    console.log(props, "fghijok")
    return <>
      {props?.data.status === true ? <button className="btn btn-success btn-sm" onClick={() => { changeCategoryStatus(props?.data._id) }} >Verified</button> : <button className="btn btn-danger btn-sm" onClick={() => { changeCategoryStatus(props?.data._id) }}>Not Verified</button>}
    </>;
  }

  function changeCategoryStatus(){}
  return (
    <>
      <Header />
      <Sidebar />

      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                Car Category
                <div className="float-end btns_head">
                  <button
                    className="btn btn-theme btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#createGroup"
                  >
                    Add New Car Category
                  </button>
                  
                </div>
              </h4>
              <div>
                <div
                  className="modal fade"
                  id="createGroup"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Add  Category
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
                            <label className="form-label">Category Name</label>
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control"
                                value={CarCategoryData}
                                onChange={(e) => {
                                    setCarCategoryData(e.target.value);
                                }}
                              />
                              <div
                                className="hint_box"
                                style={{ display: "block" }}
                              ></div>
                            </div>
                          </div>
                           <div className="col-md-12 mb-3">
                            <label className="form-label">image</label>
                            <div className="position-relative">
                              <input
                                type="file"
                                className="form-control"
                               
                                onChange={(e) => {
                                  setImage(e.target.files[0]);
                                 }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          className="btn btn-danger CancelBtn"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={addCarCategory}
                          type="button"
                          className="btn submitBtn"
                          data-bs-dismiss="modal"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="modal fade"
                id="UpdateStudentsData"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-scrollable">
                  <div className="modal-content">
                    <UpdateCarCategory
                      updatedData={UpdateCarCategoryData}
                      onEditDataFunction={  carCategoryGet}
                    />
                  </div>
                </div>
              </div>
              <div
                className="modal fade DeletePopup"
                id="DeleteCarCategoryData"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="">
                            <p>Are you sure you want to delete this car category?</p>
                            <button
                              type="button"
                              className="btn btn-danger CancelBtn"
                              data-bs-dismiss="modal"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              onClick={() => {
                                 CarCategoryDelete(DeleteDeleteId);
                              }}
                              className="btn submitBtn"
                              data-bs-dismiss="modal"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="modal fade"
                id="UserViewId"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-scrollable modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Car Category Detail{" "}
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
                        <div className="col-12">
                          <div className="card">
                            <div className="card-body border">
                              <div className="profile_box">
                                <div className="profile_box_body">
                                  <div>
                                    {" "}
                                    <h6> Fule  : {viewCategory.carCategory}</h6>
                                  </div>
                                  <div>
                                    {" "}
                                    {/* <h6> Category image : {ViewFuel.image}</h6> */}
                                    <img src={viewCategory.image}/>
                                  </div>

                                  
                                  
                                </div>
                              </div>
                            </div>
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
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="ag-theme-alpine cts_datatable"
                style={{ height: 645 }}
              >
                <AgGridReact
                //   rowHeight={rowHeight}
                  style={{ width: "100%", height: "100%;" }}
                  pagination={pagination}
                //   paginationPageSize={paginationPageSize}
                  rowData={rowData}
                  domLayout="autoHeight"
                //   defaultColDef={defaultColDef}
                  frameworkComponents={{
                    childMessageRenderer: ChildMessageRenderer,
                    srNoRenderer: SrNoRenderer,
                    statusRenderer: StatusRenderer,
                    imageRender:ImageRender
                  }}
                >
                  <AgGridColumn
                    width={90}
                    field="SrNo"
                    Srno={true}
                    sortable={false}
                    filter={false}
                    cellRenderer="srNoRenderer"
                  ></AgGridColumn>
                  <AgGridColumn
                    width={200}
                    field="carCategory"
                    sortable={false}
                    filter={false}
                    // cellRenderer="MoodRendererfour"
                  ></AgGridColumn>
                    <AgGridColumn
                    width={250}
                    field="image"
                    sortable={false}
                    filter={false}
                   cellRenderer="imageRender"
                  ></AgGridColumn>
                 
                  
                     <AgGridColumn
                    cellRenderer="statusRenderer"
                    field="status"
                    sortable={false}
                    filter={false}
                  ></AgGridColumn>
                  <AgGridColumn
                    width={250}
                    field="Action"
                    cellRenderer="childMessageRenderer"
                    colId="params"
                    sortable={true}
                    filter={true}
                  ></AgGridColumn>
                </AgGridReact>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CarCategory;


