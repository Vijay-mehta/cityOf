import React, { useMemo, useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
// import UpdateCategory from "./Updatecategory";
// import brandUpdate from "./brandUpdate";
// import BrandUpdate from "./brandUpdate";
import FuelUpdate from "./fuelUpdate";

import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import Header from "../Header/header";
import Sidebar from "../Sidebar/sidebar";
import { AiFillEye } from "react-icons/ai";

function Fuel() {
  const [DeleteDeleteId, setDeleteDeleteId] = useState("");
  const [UpdateBrand, setUpdateBrand] = useState({});
  const [ViewFuel, setViewFuel] = useState([]);
  const [fuel, setFuel] = useState("");
  const [addimage, setimage] = useState("");
  const [rowData, setRowData] = useState([]);
  const pagination = true;
  //   const paginationPageSize = 10;
  //   const rowHeight = 55;

  const MoodRenderer = (props) => {
    return (
      <span className="profle_img_box">
        <stong>{props.data.category}</stong>
      </span>
    );
  };
  const imageRerander = (props) => {
    return (
      // <img src={props.data.image}/>
      <span className="profle_img_box">
        <img className="profile_img_table" src={props.data.image} alt="icon" />
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

  const ChildMessageRenderer = (props) => {
    return (
      <div className="iconActionList">
        <div
          className="editIcon"
          onClick={() => {
            console.log(props, "edit");
            setUpdateBrand(props.data);
          }}
          data-bs-toggle="modal"
          data-bs-target="#UpdateStudentsData"
        >
          <MdModeEditOutline className="ActionIcon viewicon" />
        </div>
        <div
          className="ViewIcon"
          onClick={() => {
            console.log(props, "propstyty");
            setViewFuel(props.data);
          }}
          data-bs-toggle="modal"
          data-bs-target="#UserViewId"
        >
          <AiFillEye alt="" src="../../images/view.jpg" />
        </div>
        <div
          className="DeleteIcon"
          onClick={() => {
            setDeleteDeleteId(props.data._id);
          }}
          data-bs-toggle="modal"
          data-bs-target="#DeleteStudentData"
        >
          <AiFillDelete className="ActionIcon" />
        </div>
      </div>
    );
  };

  // ------Post API-------//

  function addFuel() {
    var data = new FormData();
    data.append("fuel", fuel);
    data.append("image", addimage);
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/fuel`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data, "fuel");
        fuelGet();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    fuelGet();
  }, []);

  function fuelGet() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/Getfuel`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response.data, "brand");

        setRowData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function FuelDelete(id) {
    var data = JSON.stringify({
      fuelid: id,
    });
    console.log(data);

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/deletefuel`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        fuelGet();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const editdataReloadFunc = () => {
    fuelGet();
  };

  const StatusRenderer = (props) => {
    console.log(props, "fghijok");
    return (
      <>
        {props?.data.status === true ? (
          <button
            className="btn btn-success btn-sm"
            onClick={() => {
              changeCategoryStatus(props?.data._id);
            }}
          >
            Verified
          </button>
        ) : (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              changeCategoryStatus(props?.data._id);
            }}
          >
            Not Verified
          </button>
        )}
      </>
    );
  };

  function changeCategoryStatus() {}
  return (
    <>
      <Header />
      <Sidebar />

      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                Fuel
                <div className="float-end btns_head">
                  <button
                    className="btn btn-theme btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#createGroup"
                  >
                    Add New Fuel
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
                          Add Fuel
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
                            <label className="form-label">Fuel Name</label>
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control"
                                value={fuel}
                                onChange={(e) => {
                                  setFuel(e.target.value);
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
                          onClick={addFuel}
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
                    <FuelUpdate
                      updatedData={UpdateBrand}
                      onEditDataFunction={fuelGet}
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
                            <p>Are you sure you want to delete this fuel?</p>
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
                                FuelDelete(DeleteDeleteId);
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
                        Fuel Detail{" "}
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
                                    <h6> Fuel : {ViewFuel.fuel}</h6>
                                  </div>
                                  <div>
                                    {" "}
                                    {/* <h6> Category image : {ViewFuel.image}</h6> */}
                                    <img src={ViewFuel.image} />
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
                    field="fuel"
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

export default Fuel;
