import React, { useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import Header from "../../shared/Header/header";
import Sidebar from "../../shared/Sidebar/sidebar";
import { AiFillEye } from "react-icons/ai";
import UpdateCity from "./Updatcitys"
import "./city.css";


function City() {
  const [DeleteDeleteId,setDeleteDeleteId] = useState("");
  const[UpdateCityData,setUpdateCityData] = useState("");
  const [Viewuser, setViewuser] = useState([]);
  const [city, setcity] = useState("");
  const [addimage, setimage] = useState("");
  const [rowData, setRowData] = useState([]);
  const pagination = true;

  const paginationPageSize = 10;
  const rowHeight = 55;

  
  const imageRerander = (props) => {
    console.log(props.data.image,'errrr')
    return (
    //  <img src={props.data.image}/>
      <span className="profle_img_box">
      <img className="profile_img_table" src={props.data.image} alt="icon" />
    </span>
    )
  }

  const SrNoRenderer = (props) => {
   
    return (
      <>
        <span>{props.node.rowIndex + 1}</span>
      </>
    );
  };

  const ChildMessageRenderer = (props) => {
    return (
      <div className="iconActionList">
        <div className="editIcon"
          onClick={() => {
            console.log(props.data,"props.data")
            setUpdateCityData(props.data);
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
          console.log(props, "propstyty");
          setViewuser(props.data);
        }}
        data-bs-toggle="modal"
        data-bs-target="#UserViewId"
        alt=""
        src="../../images/view.jpg"
        >
          <AiFillEye
           
          />
        </div>
        <div className="DeleteIcon"
         onClick={() => {
          setDeleteDeleteId(props.data._id);
        }}
        data-bs-toggle="modal"
        data-bs-target="#DeleteStudentData"
        >
          <AiFillDelete
            className="ActionIcon"
           
          />
        </div>
      </div>
    );
  };

  // ------Post API-------//

  function addCity() {
   
    var data = new FormData();
    data.append("city", city);
    data.append("image", addimage);
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/City`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
      
        getCity();
          resetForm('');
        
      
        console.log(response,"747892305749");
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const resetForm = () => {
		setcity('');
		setimage('');

	  };
  useEffect(() => {
    getCity();
  }, []);

  function getCity() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getCity`,
      headers: {
        Authorization: localStorage.getItem("token"),
        
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response.data,"city")
     
        setRowData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function CitydeleteData(id) {
    var data = new FormData();
      data.append("citiesId", id);
    console.log(data);

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/deleteCity`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
       getCity();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const StatusRenderer = (props) => {
    console.log(props, "fghijok")
   return (
			<span className="status">
				<label className="switch">
					<input className="switch-input" type="checkbox" />
					<span
						className="switch-label"
						data-on="Active"
						data-off="Deactive"
					></span>
					<span className="switch-handle"></span>
				</label>
			</span>
		);
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
                City Details
                <div className="float-end btns_head">
                  <button
                    className="btn btn-theme btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#createGroup"
                  >
                    Add New City
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
                          Add City
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
                            <label className="form-label">City Name</label>
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control"
                                value={city}
                                onChange={(e) => {
                                  setcity(e.target.value);
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
                                  setimage(e.target.files[0]);
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
                          onClick={addCity}
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
                    <UpdateCity
                      updatedData={UpdateCityData}
                      onEditDataFunction={  getCity}
                    />
                  </div>
                </div>
              </div>
              <div
                className="modal fade DeletePopup"
                id="DeleteStudentData"
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
                            <p>Are you sure you want to delete this City?</p>
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
                                CitydeleteData(DeleteDeleteId);
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
                        Users Detail{" "}
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
                                    <h6> City  : {Viewuser.city}</h6>
                                  </div>
                                  <div>
                                    {" "}
                                    <h6>  <img src= {Viewuser.image}/></h6>
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
                  rowHeight={rowHeight}
                  style={{ width: "100%", height: "100%;" }}
                  pagination={pagination}
                  paginationPageSize={paginationPageSize}
                  rowData={rowData}
                  domLayout="autoHeight"
                //   defaultColDef={defaultColDef}
                  frameworkComponents={{
                    childMessageRenderer: ChildMessageRenderer,
                    srNoRenderer: SrNoRenderer,
                    statusRenderer: StatusRenderer,
                    imageRender: imageRerander,
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
                     field="city"
                    sortable={false}
                    filter={false}
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

export default City;
