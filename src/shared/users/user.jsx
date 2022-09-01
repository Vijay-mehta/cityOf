import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Updateusers from "./UpdateUser";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import Header from "../../shared/Header/header";
import Sidebar from "../../shared/Sidebar/sidebar";
import { AiFillEye } from "react-icons/ai";
import { useHistory } from "react-router-dom";
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

// ---INDEX NUMBER SHOW IN TABLE FROM IMAGERANDER --//

const ImageRander = (props) => {
  console.log(props, "data");

  return (
    <span className="profle_img_box">
      <img className="profile_img_table" src={props.data?.image} />
    </span>
  );
};

// ---INDEX NUMBER SHOW IN TABLE FROM STATUSRENDERER --//

// ---COMPONENT NAME --//

function User() {
  const [DeleteDeleteId, setDeleteDeleteId] = useState("");
  const [UpdateStudentData, setUpdateCategoriesData] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPinCode] = useState("");
  const [image, setimage] = useState("");
  const [state, setState] = useState("");
  const [date, setDate] = useState("");
  const [rowData, setRowData] = useState("");

  const [search, setSearch] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // console.log(search,"search")
  const gridRef = useRef();
  const pagination = true;
  const paginationPageSize = 20;
  const rowHeight = 55;

  let history = useHistory();
  let viewData = [];

  // ------ADD USER API-------//

  function addusers(postdata) {
    var data = new FormData();
    data.append("type", "customer");
    data.append("name", postdata.name);
    data.append("email", email);
    data.append("mobile", postdata.mobile);
    data.append("city", postdata.city);
    data.append("date", postdata.date);
    data.append("State", postdata.state);
    data.append("PinCode", postdata.pincode);
    data.append("image", image);
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/user`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        getuserdata();
        setIsOpen(false);
        reset();
        resetForm();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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
  const resetForm = () => {
    setEmail("");

    setimage("");
  };
  useEffect(() => {
    getuserdata();
    getviewUser();
  }, []);

  // ------GET USER API-------//

  function getuserdata() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getuser`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response, "777");
        setRowData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // ------ USER VIEW API-------//

  function getviewUser() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/viewUser`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response, "view");
        for (var x in response.data.data) {
          viewData.push(response.data.data[x]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // ------ Delete API -------//

  function userdeleteData(index) {
    var data = JSON.stringify({
      userId: index,
    });
    console.log(data);

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/deleteuser`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getuserdata();
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
            console.log(props.data, "uuuuuu");
            setUpdateCategoriesData(props.data);
          }}
          data-bs-toggle="modal"
          data-bs-target="#UpdateStudentsData"
        >
          <MdModeEditOutline className="ActionIcon viewicon" />
        </div>
        <div
          className="ViewIcon"
          onClick={() => {
            console.log(viewData, "viewData");
            history.push({
              pathname: "userView",
              state: { details: props.data, detailsone: viewData },
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

  const StatusRenderer = (props) => {
    return (
      <>
        {props?.data.status === true ? (
          <button
            className="btn btn-success btn-sm"
            onClick={() => {
              // console.log(props,"888888")
              changeStudentStatus(props?.data._id);
            }}
          >
            Active
          </button>
        ) : (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              changeStudentStatus(props?.data._id);
            }}
          >
            Deactivate
          </button>
        )}
      </>
    );
  };

  function changeStudentStatus(userId) {
    var data = JSON.stringify({
      userid: userId,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/ChangeStatus`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getuserdata();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleSearch = (e) => {
    console.log(e, "e");
    setSearch(e.target.value);
  };

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current?.api?.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, [search]);

  const onPrintQuickFilterTexts = useCallback(() => {
    gridRef.current?.api?.forEachNode(function (rowNode, index) {
      console.log(
        "Row " +
          index +
          " quick filter text is " +
          rowNode.quickFilterAggregateText
      );
    });
  }, []);

  return (
    <>
      <Header />
      <Sidebar />

      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                User
                <div className="float-end btns_head">
                  <button
                    className="btn btn-theme btn-sm"
                    // data-bs-toggle="modal"
                    // data-bs-target="#createGroup"
                    onClick={() => setIsOpen(true)}
                  >
                    Add New User
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
                              Add User
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              onClick={() => crossForm()}
                            ></button>
                          </div>
                          <form onSubmit={handleSubmit(addusers)}>
                            <div className="modal-body">
                              <div className="row">
                                <div className="col-md-12 mb-3">
                                  <label className="form-label">
                                    User Name
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
                                    User Email
                                  </label>
                                  <div className="position-relative">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={email}
                                      onChange={(e) => {
                                        setEmail(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-12 mb-3">
                                  <label className="form-label">
                                    User Mobile
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
                                    {/* <input  className="form-control" type="number"
                                 {...register("mobile",{minLength:10,maxLength:10})} />
                                  {errors?.mobile?.type === "minLength" && (<p>Only 10 digit number</p>)}
                                  {errors?.mobile?.type === "maxLength" && (<p>Only 10 digit number</p>)} */}

                                    <input
                                      className="form-control"
                                      type="number"
                                      {...register("mobile", {
                                        required: true,
                                      })}
                                    />
                                    {errors?.mobile?.type === "required" && (
                                      <p>This field is required</p>
                                    )}
                                  </div>
                                </div>
                                <div className="col-md-12 mb-3">
                                  <label className="form-label"> Date</label>
                                  {/* <input
                              value={date}
                              type="Date"
                              className="form-control"
                              onChange={(e) => {
                                setDate(e.target.value);
                              }}
                            />{" "} */}
                                  <input
                                    className="form-control"
                                    type="date"
                                    {...register("date", { required: true })}
                                  />
                                  {errors?.date?.type === "required" && (
                                    <p>This field is required</p>
                                  )}
                                </div>

                                <div className="col-md-12 mb-3">
                                  <label className="form-label">City</label>
                                  <div className="position-relative">
                                    {/* <input
                                type="text"
                                className="form-control"
                                value={city}
                                onChange={(e) => {
                                  setCity(e.target.value);
                                }}
                              /> */}
                                    <input
                                      className="form-control"
                                      {...register("city", {
                                        required: true,
                                        pattern: /^[A-Za-z]+$/i,
                                      })}
                                    />
                                    {errors?.city?.type === "pattern" && (
                                      <p>Alphabet only</p>
                                    )}
                                    {errors?.city?.type === "required" && (
                                      <p>This field is required</p>
                                    )}
                                  </div>
                                </div>
                                <div className="col-md-12 mb-3">
                                  <label className="form-label">State</label>
                                  <div className="position-relative">
                                    {/* <input
                                type="text"
                                className="form-control"
                                value={state}
                                onChange={(e) => {
                                  setState(e.target.value);
                                }}
                              /> */}

                                    <input
                                      className="form-control"
                                      {...register("state", {
                                        required: true,
                                        pattern: /^[A-Za-z]+$/i,
                                      })}
                                    />
                                    {errors?.state?.type === "pattern" && (
                                      <p>Alphabet only</p>
                                    )}
                                    {errors?.state?.type === "required" && (
                                      <p>This field is required</p>
                                    )}
                                  </div>
                                </div>

                                <div className="col-md-12 mb-3">
                                  <label className="form-label">Pin Code</label>
                                  <div className="position-relative">
                                    {/* <input
                                type="text"
                                className="form-control"
                                value={pincode}
                                onChange={(e) => {
                                  setPinCode(e.target.value);
                                }}
                              /> */}

                                    <input
                                      className="form-control"
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
                                          setimage(e.target.files[0])
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
                                  // onClick={addusers}

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
                    <Updateusers
                      updatedData={UpdateStudentData}
                      onEditDataFunction={getuserdata}
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
                            <p>Are you sure you want to delete this User?</p>
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
                                userdeleteData(DeleteDeleteId);
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
                className="ag-theme-alpine cts_datatable"
                style={{ height: 645 }}
              >
                {/* <input
            type="text"
            id="filter-text-box"
            placeholder="Filter..."
            onInput={onFilterTextBoxChanged}
            onChange={handleSearch}
          />

          <button
            style={{ marginLeft: '20px' }}
            onClick={onPrintQuickFilterTexts}
          >
            Print Quick Filter Cache Texts
          </button> */}
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
                    imageRander: ImageRander,
                    srNoRenderer: SrNoRenderer,
                    statusRenderer: StatusRenderer,

                    // statusRenderer: StatusRenderer,
                  }}
                >
                  <AgGridColumn
                    width={110}
                    field="SrNo"
                    Srno={true}
                    sortable={false}
                    filter={false}
                    cellRenderer="srNoRenderer"
                  ></AgGridColumn>
                  <AgGridColumn
                    width={140}
                    field="name"
                    sortable={false}
                    filter={false}
                  ></AgGridColumn>
                  <AgGridColumn
                    width={180}
                    field="mobile"
                    sortable={false}
                    filter={false}
                  ></AgGridColumn>
                  <AgGridColumn
                    width={200}
                    field="city"
                    sortable={false}
                    filter={false}
                  ></AgGridColumn>
                  <AgGridColumn
                    width={140}
                    cellRenderer="statusRenderer"
                    field="status"
                    sortable={false}
                    // comparator={customLowerCaseComparator}
                  ></AgGridColumn>
                  <AgGridColumn
                    width={200}
                    field="Action"
                    cellRenderer="childMessageRenderer"
                    // colId="params"
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

export default User;
