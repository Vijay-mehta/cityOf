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
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import UpdateScout from "./UpdateScout";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";

// ---INDEX NUMBER SHOW IN TABLE FROM SRNORENDERER --//

const SrNoRenderer = (props) => {
  return (
    <>
      <span>{props.node.rowIndex + 1}</span>
    </>
  );
};

// ---IMAGE  SHOW IN TABLE FROM IMAGERANDER --//

const imageRenderer = (props) => {
  console.log(props, "data");

  return (
    <span className="profle_img_box">
      <img className="profile_img_table" src={props.data?.image} />
    </span>
  );
};

// ---STATE  SHOW IN TABLE FROM STATERANDER --//

const StatusRenderer = (props) => {
  return (
    <>
      {props?.data.status === true ? (
        <button
          className="btn btn-success btn-sm"
          // onClick={() => {
          //   changeEventStatus(props?.data._id);
          // }}
        >
          Verified
        </button>
      ) : (
        <button
          className="btn btn-danger btn-sm"
          // onClick={() => {
          //   changeEventStatus(props?.data._id);
          // }}
        >
          Not Verified
        </button>
      )}
    </>
  );
};

function Scout() {
  const [DeleteDeleteId, setDeleteDeleteId] = useState("");
  const [UpdateScoutData, setUpdateScoutData] = useState({});
  const [Viewuser, setViewuser] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [street, setStreet] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [image, setImage] = useState("");
  const [rowData, setRowData] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isOpen, setIsOpen] = useState(false);

  const pagination = true;
  const paginationPageSize = 20;
  const rowHeight = 55;

  let history = useHistory();
  let viewData = [];
  console.log(viewData, "46456");

  // ------Post API-------//

  function addScout(postdata) {
    // e.preventDefault();
    var data = new FormData();
    data.append("name", postdata.name);
    data.append("email", postdata.email);
    data.append("mobile", postdata.mobile);
    data.append("Street", postdata.street);
    data.append("State", postdata.state);
    data.append("PinCode", postdata.pincode);
    data.append("image", image);
    data.append("type", "Scout");

    var config = {
      method: "post",
      // url: `${process.env.REACT_APP_BASEURL}/register`,
      url: `http://54.221.3.19:3200/api/register`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data, "add User");
        setIsOpen(false);
        scoutGet();
        reset();
        resetForm();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const resetForm = () => {
    setImage("");
  };

  useEffect(() => {
    scoutGet();
  }, []);

  // ------GET SCOUT API-------//

  function scoutGet() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/GetScout`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response, "getuser");
        setRowData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const editdataReloadFunc = () => {};

  // ----SCOU DELETE API---//

  function scoutDelete(id) {
    var data = JSON.stringify({
      userid: id,
    });
    console.log(data);

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/deleteScout`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        scoutGet();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // ------ ACTION SHOW IN TABLE -------//

  const ChildMessageRenderer = (props) => {
    return (
      <div className="iconActionList">
        <div
          className="editIcon"
          onClick={() => {
            setUpdateScoutData(props.data);
          }}
          data-bs-toggle="modal"
          data-bs-target="#UpdateStudentsData"
        >
          <MdModeEditOutline className="ActionIcon viewicon" />
        </div>
        <div
          className="ViewIcon"
          // onClick={() =>{console.log(props.data,"view");history.push("userView/" + props.data._id)} }
          onClick={() => {
            history.push({
              pathname: "ScoutView",
              state: { details: props.data },
            });
          }}
        >
          <AiFillEye className="ActionIcon" />
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

  function canclefun() {
    setIsOpen(false);
    cancelForm();
  }

  function cancelForm() {
    reset();
  }

  function crossForm() {
    setIsOpen(false);
    cross();
  }

  function cross() {
    reset();
  }

  return (
    <>
      <Header />
      <Sidebar />

      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                Scout
                <div className="float-end btns_head">
                  <button
                    className="btn btn-theme btn-sm"
                    // data-bs-toggle="modal"
                    // data-bs-target="#createGroup"
                    onClick={() => setIsOpen(true)}
                  >
                    Add New Scout
                  </button>
                </div>
              </h4>
              <div>
                <Modal show={isOpen} onHide>
                  <Modal.Body>
                    <div
                      // className="modal fade"
                      // id="createGroup"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Add Scout
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              onClick={() => crossForm()}
                            ></button>
                          </div>
                          <form onSubmit={handleSubmit(addScout)}>
                            <div className="modal-body">
                              <div className="row">
                                <div className="col-md-12 mb-3">
                                  <label className="form-label">
                                    Scout Name
                                  </label>
                                  <div className="position-relative">
                                    {/* <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => {
                                  setName(e.target.value);
                                }}
                              /> */}
                                    <input
                                      className="form-control"
                                      {...register("name", {
                                        required: true,
                                        pattern: /^[A-Za-z]+$/i,
                                      })}
                                    />
                                    {errors?.name?.type === "pattern" && (
                                      <p>Alphabet only</p>
                                    )}
                                    {errors?.name?.type === "required" && (
                                      <p>This field is required</p>
                                    )}
                                    <div
                                      className="hint_box"
                                      style={{ display: "block" }}
                                    ></div>
                                  </div>
                                </div>
                                <div className="col-md-12 mb-3">
                                  <label className="form-label">
                                    Scout Email
                                  </label>
                                  <div className="position-relative">
                                    {/* <input
                                type="text"
                                className="form-control"
                                value={email}
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                }}
                              /> */}

                                    <input
                                      className="form-control"
                                      {...register("email", {
                                        required: true,
                                        pattern:
                                          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                      })}
                                    />
                                    {errors?.email?.type === "pattern" && (
                                      <p>Invalid email address</p>
                                    )}
                                    {errors?.email?.type === "required" && (
                                      <p>This field is required</p>
                                    )}
                                  </div>
                                </div>
                                <div className="col-md-12 mb-3">
                                  <label className="form-label">
                                    Scout Mobile
                                  </label>
                                  <div className="position-relative">
                                    {/* <input
                                type="text"
                                className="form-control"
                                value={mobile}
                                onChange={(e) => {
                                  setMobile(e.target.value);
                                }}
                              /> */}

                                    <input
                                      className="form-control"
                                      type="number"
                                      {...register("mobile", {
                                        required: true,
                                        minLength: 10,
                                        maxLength: 10,
                                      })}
                                    />
                                    {errors?.mobile?.type === "required" && (
                                      <p>This field is required</p>
                                    )}
                                    {errors?.mobile?.type === "minLength" && (
                                      <p>Only 10 digit number</p>
                                    )}
                                    {errors?.mobile?.type === "maxLength" && (
                                      <p>Only 10 digit number</p>
                                    )}
                                  </div>
                                </div>
                                <div className="col-md-12 mb-3">
                                  <label className="form-label">Street</label>
                                  <div className="position-relative">
                                    {/* <input
                                type="text"
                                className="form-control"
                                value={street}
                                onChange={(e) => {
                                  setStreet(e.target.value);
                                }}
                              /> */}

                                    <input
                                      className="form-control"
                                      type="text"
                                      {...register("street", {
                                        required: true,
                                      })}
                                    />
                                    {errors?.street?.type === "required" && (
                                      <p>This field is required</p>
                                    )}
                                  </div>
                                </div>
                                <div className="col-md-12 mb-3">
                                  <label className="form-label"> State</label>
                                  {/* <input
                              value={state}
                              type="text"
                              className="form-control"
                              onChange={(e) => {
                                setState(e.target.value);
                              }}
                            /> */}
                                  <input
                                    className="form-control"
                                    type="text"
                                    {...register("state", { required: true })}
                                  />
                                  {errors?.state?.type === "required" && (
                                    <p>This field is required</p>
                                  )}{" "}
                                </div>
                                <div className="col-md-12 mb-3">
                                  <label className="form-label">PinCode</label>
                                  <div className="position-relative">
                                    {/* <input
                                type="text"
                                className="form-control"
                                value={pincode}
                                onChange={(e) => {
                                  setPincode(e.target.value);
                                }}
                              /> */}

                                    <input
                                      className="form-control"
                                      type="text"
                                      {...register("pincode", {
                                        required: true,
                                      })}
                                    />
                                    {errors?.pincode?.type === "required" && (
                                      <p>This field is required</p>
                                    )}
                                  </div>
                                </div>

                                <div className="col-md-12 mb-3">
                                  <label className="form-label">
                                    User Image
                                  </label>
                                  <div className="position-relative">
                                    <div>
                                      <input
                                        type="file"
                                        onChange={(e) =>
                                          setImage(e.target.files[0])
                                        }
                                        className="form-control"
                                      />
                                    </div>
                                    <div
                                      className="hint_box"
                                      style={{ display: "block" }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                              <div class="modal-footer">
                                <button
                                  onClick={() => canclefun()}
                                  type="button"
                                  className="btn btn-danger CancelBtn"
                                  data-bs-dismiss="modal"
                                >
                                  Cancel
                                </button>
                                <button
                                  // onClick={addScout}
                                  type="submit"
                                  className="btn submitBtn"
                                  // data-bs-dismiss="modal"
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
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
                    <UpdateScout
                      updatedData={UpdateScoutData}
                      onEditDataFunction={scoutGet}
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
                            <p>Are you sure you want to delete this Scout?</p>
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
                                scoutDelete(DeleteDeleteId);
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
                                    <h6> User Name : {Viewuser.name}</h6>
                                  </div>
                                  <div>
                                    {" "}
                                    <h6> User Email : {Viewuser.email}</h6>
                                  </div>

                                  <div>
                                    {" "}
                                    <h6> User Mobile : {Viewuser.mobile}</h6>
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
                                  ></div>
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
                    imageRenderer: imageRenderer,

                    // statusRenderer: StatusRenderer,
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
                    width={150}
                    field="image"
                    sortable={false}
                    filter={false}
                    cellRenderer="imageRenderer"
                  ></AgGridColumn>
                  <AgGridColumn
                    width={140}
                    field="name"
                    sortable={false}
                    filter={false}
                    cellRenderer="nameRenderer"
                  ></AgGridColumn>
                  {/* <AgGridColumn
                    width={200}
                    field="email"
                    sortable={false}
                    filter={false}
                    // cellRenderer="EmailRender"
                  ></AgGridColumn> */}
                  <AgGridColumn
                    width={150}
                    field="mobile"
                    sortable={false}
                    filter={false}
                  ></AgGridColumn>
                  <AgGridColumn
                    width={120}
                    field="active order"
                    sortable={false}
                    filter={false}
                    // cellRenderer="EmailRender"
                  ></AgGridColumn>
                  <AgGridColumn
                    width={120}
                    field="total order"
                    sortable={false}
                    filter={false}
                    // cellRenderer="EmailRender"
                  ></AgGridColumn>

                  {/* <AgGridColumn
                    cellRenderer="statusRenderer"
                    field="status"
                    sortable={false}
                    // comparator={customLowerCaseComparator}
                  ></AgGridColumn> */}
                  <AgGridColumn
                    width={200}
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

export default Scout;
