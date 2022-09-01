import React, { useMemo, useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import UpdateServie from "./updateservice";

import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import Header from "../../shared/Header/header";
import Sidebar from "../../shared/Sidebar/sidebar";
import { AiFillEye } from "react-icons/ai";
import {useHistory} from 'react-router-dom'

function Service() {
  
//   const [AddServiceName, setserviceName] = useState("");
const [UpdateServiceData, setUpdateServiceData] = useState({});
  const [Viewuser, setViewuser] = useState([]);
  const [newService, setservice] = useState("");
  const [Addimage, setimage] = useState("");
  const [DeleteDeleteId,setDeleteDeleteId] = useState("")
  const [rowData, setRowData] = useState([]);
  const pagination = true;
  const paginationPageSize = 10;
  const rowHeight = 55;
  let history = useHistory();

  const MoodRenderer = (props) => {
    return (
      <span className="profle_img_box">
        <stong>{props.data}</stong>
      </span>
    );
  };

  const SrNoRenderer = (props) => {
    console.log(props, "iam12333iam12333");
    return (
      <>
        <span>{props.node.rowIndex + 1}</span>
      </>
    );
  };
  const ServiceNameRenderer = (props) => {
    console.log(props, "props212212");
    return (
      <>
        <span>{props.data.servicecategory}</span>
      </>
    );
  };
  const ServiceImageRenderer = (props) => {
    console.log(props.data, "props212212");
    return (
      <>
        {/* <span><img src={props.data.image}/></span> */}
        <span className="profle_img_box">
      <img className="profile_img_table" src={props.data?.image} alt="icon" />
    </span>
      </>
    );
  };

  const ChildMessageRenderer = (props) => {
    console.log(props,"props")

    return (
      <div className="iconActionList">
        <div className="editIcon"
          onClick={() => {
              
            setUpdateServiceData(props.data);
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

 

  function addservices() {
  

    var data = new FormData();
  
    data.append("servicecategory", newService);
    data.append("image", Addimage);

    
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/service`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        //  window.location.reload(false);
        console.log(response.data, "add User");
        getService();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

   useEffect(() => {
    getService();
  }, []);

  function getService() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getService`,
      headers: {
        Authorization: localStorage.getItem("token"),
        
      },
    };
    axios(config)
      .then(function (response) {
         console.log(response.data.getservice,"getservice")
        setRowData(response.data.getservice);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // ------ Delete API -------//
  function  Servicedelete(index) {
    var data = JSON.stringify({
      servicecategoryId:index,
    });
    console.log(localStorage.getItem("token"));

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/deleteservice`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        getService();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function ServiceEdit(index) {
    var data = JSON.stringify({
      "servicecategoryId": index,
    });
      var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/editService`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      
    };

    axios(config)
      .then(function (response) {
       
        getService();

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const editdataReloadFunc = () => {
     getService();;
  };

  const StatusRenderer = (props) => {
    console.log(props, "fghijok")
    return <>
      {props?.data.status === true ? <button className="btn btn-success btn-sm" onClick={() => { changeServiceStatus(props?.data._id) }} >Verified</button> : <button className="btn btn-danger btn-sm" onClick={() => { changeServiceStatus(props?.data._id) }}>Not Verified</button>}
    </>;
  }

  function changeServiceStatus(){}
  console.log(rowData);
  return (
    <>
      <Header />
      <Sidebar />

      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                Service
                <div className="float-end btns_head">
                <button
                    className="btn btn-theme btn-sm"
                    onClick = {()=>history.push("./Addservice")}
                  >
                    Add New Service
                  </button>
                  <button
                    className="btn btn-theme btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#uploadCSV"
                  >
                    Upload CSV
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
                          Add Service
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
                            <label className="form-label">service Name</label>
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control"
                                value={newService}
                                onChange={(e) => {
                                  setservice(e.target.value);
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
                          {/* <div className="col-md-12 mb-3"></div> */}
                        
                       
                     
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
                          onClick={addservices}
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
                    <UpdateServie
                      updatedData={UpdateServiceData}
                      onEditDataFunction={ServiceEdit}
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
                            <p>Are you sure you want to delete this Service</p>
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
                                Servicedelete(DeleteDeleteId);
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
                                    <h6> Service Name : {Viewuser.newService}</h6>
                                  </div>
                                  <div>
                                    {" "}
                                    <h6>  image : {Viewuser.Addimage}</h6>
                                  </div>

                                 
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="card">
                            <div className="card-body border">
                              <div>
                                <ul className="nav nav-pills" role="tablist">
                                  <li className="nav-item">
                                    <a
                                      className="nav-link active"
                                      data-bs-toggle="tab"
                                      href="#home"
                                      role="tab"
                                    >
                                      {/* <span>Users Details</span> */}
                                    </a>
                                  </li>
                                </ul>
                                <div className="tab-content pt-3">
                                  <div
                                    className="tab-pane active"
                                    id="home"
                                    role="tabpanel"
                                  >
                                    <table className="table table-bordered table_fix_width">
                                      <tbody>
                                        <tr>
                                          {/* <th>Class Name</th>
                                          <td>{Classview.admin_id?.name}</td> */}
                                        </tr>

                                        <tr>
                                          {/* <th>Class About</th>
                                          <td>{Classview.aboutBusiness}</td> */}
                                        </tr>
                                        <tr>
                                          {/* <th>Tag</th>
                                          <td>{viewTags?.join(", ")}</td> */}
                                        </tr>

                                        <tr>
                                          {/* <th>WebAddress</th>
                                          <td>{Classview.webAddress}</td> */}
                                        </tr>
                                      </tbody>
                                    </table>
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
                    moodRenderer: MoodRenderer,
                    srNoRenderer: SrNoRenderer,
                    // serviceNameRenderer : ServiceNameRenderer,
                    serviceImageRender:ServiceImageRenderer,
                    statusRenderer: StatusRenderer,

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
                    field="servicecategory"
                    sortable={false}
                    filter={false}
                    // cellRenderer="serviceNameRenderer"
                  ></AgGridColumn>
                  <AgGridColumn
                    width={150}
                    field="Image"
                    sortable={false}
                    filter={false}
                    cellRenderer ="serviceImageRender"
                  ></AgGridColumn>
                     <AgGridColumn
                    cellRenderer="statusRenderer"
                    width={250}
                    field="status"
                    sortable={false}
                    filter={false}
                  ></AgGridColumn>
                  <AgGridColumn
                    width={300}
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
export default Service;
