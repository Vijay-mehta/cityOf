
import React, {useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import UpdataSubCategory from "./UpdataSubCategory";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import Header from "../Header/header";
import Sidebar from "../Sidebar/sidebar";
import { AiFillEye } from "react-icons/ai";
import Select from "react-select";
import { useHistory } from "react-router-dom";





// console.log(rowData,"rowData")

  const SrNoRenderer = (props) => {
    return (
      <>
        <span>{props.node.rowIndex + 1}</span>
      </>
    );
  };


function Subcategory() {
  const [DeleteDeleteId,setDeleteDeleteId] = useState("")
  const [UpdateSubCategoryData, setUpdateSubCategoryData] = useState({});
  const [viewCategory, setViewCategory] = useState([]);
  const [title, setTitle] = useState("");
   const [discreption, setDiscreption] = useState("");
  const [rowData, setRowData] = useState([]);
  const [catId, setCaeId] = useState([]);
  const [CatSelect, setcatChang] = useState([]);
  const [Plan, setPlan] = useState([]);
  const [PlanId, setPlanId] = useState([]);



  const pagination = true;
//   const paginationPageSize = 10;
//   const rowHeight = 55;

let history = useHistory();

  const ChildMessageRenderer = (props) => {
    return (
      <div className="iconActionList">
        <div className="editIcon"
        onClick={() => {
          console.log(props,"99999")
          setUpdateSubCategoryData(props.data);
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
            history.push({
              pathname: "SubCategoryView",
              state: { details: props.data},
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

  function addSubCategory() {

    // var data = new FormData();
  
    // data.append("subcategory", subcategory);
    // data.append("image", image);

    var data = JSON.stringify({
      "title": title,
      "parentsid":catId,
      "discreption":discreption,
      "plan_id":PlanId
    });
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/add-sub-category`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response,"9999")
         subCategoryGet()
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    subCategoryGet();
    getCategory();
    getPlanService()
  }, []);

  function subCategoryGet() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/get-sub-category`,
      headers: {
        Authorization: localStorage.getItem("token"),
        
      },
    };
    axios(config)
      .then(function (response) {   
          console.log(response,"subcategory")     
        setRowData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  function getCategory() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getcategory`,
      headers: {
        Authorization: localStorage.getItem("token"),
        
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response.data,"catget")
        let arrCat=[];
        response.data.getdata.map((catName)=>{
          arrCat.push({label: catName.title,value: catName._id})
        });

        setcatChang(arrCat);
        // setCategorySelect(response.data.getdata);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleChangeCategory=(e)=>{
    console.log(e.value,"element")
   setCaeId(e.value)
    }

  //---PLAN GET API--//

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
        console.log(response,"plan")
        let planarr =[];
      response.data.data.map((item)=>{
     
          planarr.push({label: item.planName,value: item._id})
       
     
      })
       console.log(planarr,"planarr")
         setPlan(planarr)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleChangePlan=(e)=>{
    let selsctArrChange=[];
    e.forEach((item)=>{
      selsctArrChange.push(item.value)
    })
    setPlanId(selsctArrChange)
    }



  function subCategorydeleteData(id) {
    var data = JSON.stringify({
      categoryid: id,
    });
    console.log(data);

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/deleteSubCategory`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        subCategoryGet();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const editdataReloadFunc = () => {
    subCategoryGet()
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
                Sub Category
                <div className="float-end btns_head">
                  <button
                    className="btn btn-theme btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#createGroup"
                  >
                    Add New SubCategory
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
                          Add  Sub Category
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
                            <label className="form-label">Select Category</label>
                            <div className="position-relative">
                              
                            <Select
                              // isMulti
                              options={CatSelect}
                              onChange={(e) => handleChangeCategory(e)}
                              className="basic-multi-select"
                              classNamePrefix="select"
                            />
                              <div
                                className="hint_box"
                                style={{ display: "block" }}
                              ></div>
                            </div>
                          </div>
                          <div className="col-md-12 mb-3">
                            <label className="form-label">Select Plan</label>
                            <div className="position-relative">
                              
                            <Select
                              isMulti
                              options={Plan}
                              onChange={(e) => handleChangePlan(e)}
                              className="basic-multi-select"
                              classNamePrefix="select"
                            />
                              <div
                                className="hint_box"
                                style={{ display: "block" }}
                              ></div>
                            </div>
                          </div>
                          <div className="col-md-12 mb-3">
                            <label className="form-label">Sub Category Name</label>
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control"
                                value={title}
                                onChange={(e) => {
                                  setTitle(e.target.value);
                                }}
                              />
                              <div
                                className="hint_box"
                                style={{ display: "block" }}
                              ></div>
                            </div>
                          </div>
                           <div className="col-md-12 mb-3">
                            <label className="form-label">Discreption</label>
                            <div className="position-relative">
                              <textarea
                                type="text"
                                className="form-control"
                                value={discreption}
                                onChange={(e) => {
                                  setDiscreption(e.target.value);
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
                          onClick={addSubCategory}
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
                    <UpdataSubCategory
                      updatedData={UpdateSubCategoryData}
                       onEditDataFunction={subCategoryGet}
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
                                subCategorydeleteData(DeleteDeleteId);
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
                                    <h6> Sub Category  : {viewCategory.title}</h6>
                                  </div>
                                  <div>
                                    {" "}
                                    {/* <h6> Category image : {ViewFuel.image}</h6> */}
                                    
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
                    // imageRender:ImageRender
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
                    width={160}
                    field="title"
                    headerName="Sub Category"
                    sortable={false}
                    filter={false}
                  ></AgGridColumn>
                     <AgGridColumn
                    width={160}
                    field="parentsid"
                    headerName="Category"
                    sortable={false}
                    filter={false}
                  ></AgGridColumn>
                  <AgGridColumn
                    width={140}
                    field="discreption"
                    
                    // headerName="Category"
                    sortable={false}
                    filter={false}
                  ></AgGridColumn>
                  
              
                  
                     <AgGridColumn
                    cellRenderer="statusRenderer"
                    field="status"
                    width={200}
                    sortable={false}
                    filter={false}
                  ></AgGridColumn>
                  <AgGridColumn
                    width={220}
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

export default Subcategory;


