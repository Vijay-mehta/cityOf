import React, { useMemo, useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import Header from "../../shared/Header/header";
import Sidebar from "../../shared/Sidebar/sidebar";
import { AiFillEye } from "react-icons/ai";
import Select from 'react-select';
import { useHistory } from "react-router-dom";


function Cars() {
  const [DeleteDeleteId,setDeleteDeleteId] = useState("");

 
  const [rowData, setRowData] = useState([]);



  console.log(rowData,"rowData")
  
  const pagination = true;
  let history = useHistory();

//   const paginationPageSize = 10;
//   const rowHeight = 55;



  const imageRerander = (props) => {
    return (
      <span className="profle_img_box">
      <img className="profile_img_table" src={props.data.image} alt="icon" />
    </span>
    )
  }

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
        <div className="editIcon"
         onClick={() => {console.log(props.data,"update");
         history.push({
           pathname: "UpdateCars",
           state: { details: props.data, },
         });
       }}
        >
          <MdModeEditOutline
            className="ActionIcon viewicon"
           
          />
        </div>
        <div className="ViewIcon"
           onClick={() => {console.log(props.data,"update");
           history.push({
             pathname: "ViewCar",
             state: { details: props.data, },
           });
         }}
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


  
  


  

  useEffect(() => {
     getCars();
   
  }, []);

  

  // const editdataReloadFunc = () => {
  //   getCars();;
  // };

  function getCars() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getCar`,
      headers: {
        Authorization: localStorage.getItem("token"),
        
      },
    };
    axios(config)
      .then(function (response) {
     console.log(response.data,"carget")
        setRowData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  function CardeleteData(index) {
    var data = JSON.stringify({
      carsid: index,
    });
    console.log(data);

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/deletecar`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getCars();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const StatusRenderer = (props) => {
    console.log(props, "fghijok")
    return <>
      {props?.data.status === true ? <button className="btn btn-success btn-sm" onClick={() => { changeCarStatus(props?.data._id) }} >Verified</button> : <button className="btn btn-danger btn-sm" onClick={() => { changeCarStatus(props?.data._id) }}>Not Verified</button>}
    </>;
  }

  function changeCarStatus(){}

  

 
  return (
    <>
      <Header />
      <Sidebar />

      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                Cars Details
                <div className="float-end btns_head">
                <button
                    className="btn btn-theme btn-sm"

                    onClick={()=>history.push('./AddCar')}
                  >
                    Add New Cars
                  </button>
                  
                </div>
              </h4>
            
              <div
                className="modal fade"
                id="UpdateStudentsData"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-scrollable">
                  {/* <div className="modal-content">
                    <UpdateCars
                      updatedData={editCar}
                      // onEditDataFunction={editdataReloadFunc}
                    />
                  </div> */}
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
                            <p>Are you sure you want to delete this Car?</p>
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
                                CardeleteData(DeleteDeleteId);
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
                    width={190}
                     field="cars"
                    sortable={false}
                    filter={false}
                    // cellRenderer="MoodRendererfour"
                  ></AgGridColumn>
                    <AgGridColumn
                    width={190}
                    field="image"
                    sortable={false}
                    filter={false}
                    cellRenderer="imageRender"
                  ></AgGridColumn>
                  
{/* 
                    <AgGridColumn
                    width={200}
                    field="brand"
                    sortable={false}
                    filter={false}
                    // cellRenderer="EmailRender"
                  ></AgGridColumn>
                   <AgGridColumn
                    width={140}
                    field="variant"
                    sortable={false}
                    filter={false}
                  ></AgGridColumn> */}
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

export default Cars;
