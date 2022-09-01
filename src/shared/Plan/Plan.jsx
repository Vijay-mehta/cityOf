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
import "./Plan.css";

function Plan() {
  const [DeleteDeleteId, setDeleteDeleteId] = useState("");
  const [UpdateCategoryData, setUpdateCategoryData] = useState({});
  const [Viewuser, setViewuser] = useState([]);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [rowData, setRowData] = useState([]);
  const pagination = true;
  //   const paginationPageSize = 10;
  //   const rowHeight = 55;
  console.log(rowData, "rowData");
  let history = useHistory();
  console.log(price, "");

  const SrNoRenderer = (props) => {
    // console.log(props, "iam12333iam12333");
    return (
      <>
        <span>{props.node.rowIndex + 1}</span>
      </>
    );
  };

  // const PriceRenderer = (props) => {
  //     console.log(props.data, "iam12333iam12333");
  // //  console.log(pricearr,"pricearr")
  //   // })
  //   return (
  //     <>
  //        <span>{}</span>
  //     </>
  //   );
  // };

  const PriceNameRenderer = (props) => {
    //  console.log(props.data, "iam12333iam12333");
    let pricearrname = [];
    props?.data?.typeprice?.map((items) => {
      pricearrname.push(items.typename);
      // console.log(pricearr,"pricearr")
    });
    return (
      <>
        <span>{pricearrname}</span>
      </>
    );
  };
  const SubPriceRenderer = (props) => {
    console.log(props.data, "iam12333iam12333");
    let subpricearr = [];
    props?.data?.servicepackprice?.map((items) => {
      console.log(items, "items");
      subpricearr.push(items.price);
    });
    return (
      <>
        <span>{subpricearr}</span>
      </>
    );
  };

  const SubPriceNameRenderer = (props) => {
    console.log(props.data, "iam12333iam12333");
    let subNamepricearr = [];
    props?.data?.servicepackprice?.map((items) => {
      console.log(items, "items");
      subNamepricearr.push(items.servicename);
    });
    return (
      <>
        <span>{subNamepricearr}</span>
      </>
    );
  };

  // const priceRenderer=(props)=>{
  //   console.log(props.data.data.servicepackprice,"props6666")
  //   let text=[];
  //   let arr=props.data.data.servicepackprice;
  //   arr.map((item)=>{
  //     console.log(item.tags,"arr")
  //     text.push(item.tags);
  //   })

  //   return (
  //     <span className="profle_img_box">
  //       <span>{text.join(", ")}</span>
  //     </span>
  //   );
  // };

  const ChildMessageRenderer = (props) => {
    return (
      <div className="iconActionList">
        <div
          className="editIcon"
          onClick={() => {
            console.log(props.data, "update");
            history.push({
              pathname: "PlanUpdate",
              state: { details: props.data },
            });
          }}
        >
          <MdModeEditOutline className="ActionIcon viewicon" />
        </div>

        <div
          className="ViewIcon"
          onClick={() => {
            console.log(props.data, "propsdata");
            history.push({
              pathname: "PlanView",
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

  // ------Post API-------//

  useEffect(() => {
    getPlanService();
  }, []);

  function getPlanService() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getCommonService`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response.data.data, "plan");

        setRowData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function plandeleteData(id) {
    var data = JSON.stringify({
      PlantypeId: id,
    });
    console.log(data);

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/DeleteCommanService`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getPlanService();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // const editdataReloadFunc = () => {
  //   getCategory();
  // };

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
                Plan
                <div className="float-end btns_head">
                  <button
                    className="btn btn-theme btn-sm"
                    onClick={() => history.push("./Addplan")}
                  >
                    Add New Plan
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
                          Add Plan
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
                                // value={category}
                                // onChange={(e) => {
                                //   setCategory(e.target.value);
                                // }}
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

                                // onChange={(e) => {
                                //   setimage(e.target.files[0]);
                                //  }}
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
                          // onClick={addCategory}
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
                    {/* <UpdateCategory
                      updatedData={UpdateCategoryData}
                      onEditDataFunction={CategoryEdit}
                    /> */}
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
                            <p>Are you sure you want to delete this Plan?</p>
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
                                plandeleteData(DeleteDeleteId);
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
                                    <h6> Category : {Viewuser.category}</h6>
                                  </div>
                                  <div>
                                    {" "}
                                    <h6> Category image : {Viewuser.image}</h6>
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
                    //  priceRenderer:PriceRenderer,
                    PriceNameRenderer: PriceNameRenderer,
                    SubPriceRenderer: SubPriceRenderer,
                    SubPriceNameRenderer: SubPriceNameRenderer,
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
                    width={220}
                    field="planName"
                    sortable={false}
                    filter={false}
                    // cellRenderer="MoodRendererfour"
                  ></AgGridColumn>
                  <AgGridColumn
                    width={200}
                    field="typeprice"
                    headerName="price"
                    sortable={false}
                    filter={false}
                    // cellRenderer="priceRenderer"
                  ></AgGridColumn>
                  {/* <AgGridColumn
                    width={140}
                    field="typename"
                    headerName="price name"
                    sortable={false}
                    filter={false}
                     cellRenderer="PriceNameRenderer"
                  ></AgGridColumn> */}
                  {/* <AgGridColumn
                    width={140}
                    field="price"
                    headerName="Sub price "
                    sortable={false}
                    filter={false}
                    cellRenderer="SubPriceRenderer"
                  ></AgGridColumn> */}
                  {/* <AgGridColumn
                    width={120}
                    field="servicename"
                    headerName="Sub Price Name "
                    sortable={false}
                    filter={false}
                    cellRenderer="SubPriceNameRenderer"
                  ></AgGridColumn> */}
                  <AgGridColumn
                    cellRenderer="statusRenderer"
                    width={220}
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

export default Plan;
