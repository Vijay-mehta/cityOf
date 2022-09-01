import React, { useMemo, useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import Header from "../Header/header";
import Sidebar from "../Sidebar/sidebar";
import { AiFillEye } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import "./Order.css";
// import 'moment' from moment;
import moment from "moment";

import { useHistory } from "react-router-dom";

function Order() {
  const [DeleteDeleteId, setDeleteDeleteId] = useState("");
  const [UpdateBrand, setUpdateBrand] = useState({});
  const [brandView, setViewBrand] = useState([]);
  const [brands, setBrands] = useState("");
  const [addimage, setimage] = useState("");
  const [rowData, setRowData] = useState([]);
  // const [scoutData, setScoutData] = useState([]);

  let scoutData = [];
  console.log(scoutData, "rrrrr");
  const pagination = true;
  //   const paginationPageSize = 10;
  //   const rowHeight = 55;

  let history = useHistory();

  const NameRenderer = (props) => {
    return (
      <span>
        <stong>{props.data.bookingdata.name}</stong>
      </span>
    );
  };

  const contactRenderer = (props) => {
    return (
      <span>
        <stong>{props.data.bookingdata.contect}</stong>
      </span>
    );
  };
  const DateRenderer = (props) => {
    return (
      // <img src={props.data.image}/>
      <span>
        {/* <stong>{props.data.bookingdata.date.toString()()}</stong> */}
        {moment.utc(props.data.bookingdata.date).format("MM/DD/YYYY")}
      </span>
    );
  };

  const ScoutRenderer = (props) => {
    return <span>{props.data?.Scout_id?.name}</span>;
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
    console.log(props, "props123");
    return (
      <div className="iconActionList">
        <div
          className="editIcon"
          onClick={() => {
            console.log(props.data, "updateassign");
            history.push({
              pathname: "OrderAssign",
              state: { details: props.data },
            });
          }}
        >
          <AiOutlineCheck className="ActionIcon viewicon" />
        </div>

        <div
          className="ViewIcon"
          onClick={() => {
            console.log(props.data, "props.data");
            history.push({
              pathname: "OrderView",
              state: { details: props.data, detailone: scoutData },
            });
          }}
        >
          <AiFillEye />
        </div>

        {/* <div className="DeleteIcon"
        onClick={() => {
          setDeleteDeleteId(props.data._id);
        }}
        data-bs-toggle="modal"
        data-bs-target="#DeleteStudentData"
        >
          <AiFillDelete
            className="ActionIcon"
            
          />
        </div> */}
      </div>
    );
  };

  // ------Post API-------//

  useEffect(() => {
    ordersGet();
  }, []);

  function ordersGet() {
    var data = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getorders`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/Json",
      },
    };
    axios(data)
      .then(function (response) {
        console.log(response, "9080989");
        setRowData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const editdataReloadFunc = () => {
    //  brandGet();
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
                Order
                {/* <div className="float-end btns_head">
                  <button
                    className="btn btn-theme btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#createGroup"
                  >
                    Add New Brand
                  </button>
                  
                </div> */}
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
                          Add Brand
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
                            <label className="form-label">Brand Name</label>
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control"
                                value={brands}
                                onChange={(e) => {
                                  setBrands(e.target.value);
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
                          // onClick={addBrand}
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
                    {/* <BrandUpdate
                      updatedData={UpdateBrand}
                      //   onEditDataFunction={CategoryEdit}
                    /> */}
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
                    // moodRenderer: MoodRenderer,
                    srNoRenderer: SrNoRenderer,
                    statusRenderer: StatusRenderer,
                    // imageRender: imageRerander,
                    NameRenderer: NameRenderer,
                    contactRenderer: contactRenderer,
                    DateRenderer: DateRenderer,
                    ScoutRenderer: ScoutRenderer,
                  }}
                >
                  <AgGridColumn
                    width={80}
                    field="SrNo"
                    Srno={true}
                    sortable={false}
                    filter={false}
                    cellRenderer="srNoRenderer"
                  ></AgGridColumn>
                  <AgGridColumn
                    width={220}
                    field="orderid"
                    headerName="Order Id"
                    sortable={false}
                    filter={false}
                    // cellRenderer="MoodRendererfour"
                  ></AgGridColumn>
                  <AgGridColumn
                    width={110}
                    field="name"
                    headerName="User Name"
                    // headerName="Order Id"
                    sortable={false}
                    filter={false}
                    cellRenderer="NameRenderer"
                  ></AgGridColumn>
                  <AgGridColumn
                    width={170}
                    field="contect"
                    headerName="Contact"
                    // headerName="Order Id"
                    sortable={false}
                    filter={false}
                    cellRenderer="contactRenderer"
                  ></AgGridColumn>
                  <AgGridColumn
                    width={120}
                    field="date"
                    // headerName="Order Id"
                    sortable={false}
                    filter={false}
                    cellRenderer="DateRenderer"
                  ></AgGridColumn>
                  <AgGridColumn
                    width={120}
                    field="name"
                    // headerName="Order Id"
                    sortable={false}
                    filter={false}
                    headerName="Scout"
                    cellRenderer="ScoutRenderer"
                  ></AgGridColumn>
                  <AgGridColumn
                    width={200}
                    field="Action"
                    cellRenderer="childMessageRenderer"
                    colId="params"
                    sortable={true}
                    filter={true}
                  ></AgGridColumn>

                  {/* <AgGridColumn
                    cellRenderer="statusRenderer"
                    width={120}
                    field="status"
                    sortable={false}
                    filter={false}
                  ></AgGridColumn> */}
                </AgGridReact>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
