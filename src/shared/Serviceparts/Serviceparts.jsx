
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
import Select from 'react-select'
import ServiceUpdat from "./ServiceUpdate";

function Serviceparts() {
  const [DeleteDeleteId,setDeleteDeleteId] = useState("")
  const [UpdateCServiceData, setUpdateCServiceData] = useState({});
  const [Viewuser, setViewuser] = useState([]);
  const [title, setTitle] = useState("");
  const [addimage, setimage] = useState("");
  const [rowData, setRowData] = useState([]);
  const [categoryselect, setCategoryselect] = useState("");
  const [category, setCatSelect] = useState("");

  const [subCategorySelect, setSubCategorySelect] = useState([]);
  const [subcategory, setSubCatSelect] = useState([]);

  const [Plan, setPlan] = useState("");
  const [PlanId, setPlanId] = useState("");



  const pagination = true;
//   const paginationPageSize = 10;
//   const rowHeight = 55;



  const imageRerander = (props) => {
    return (
      // <img src={props.data.image}/>
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


  
//   const PriceNameRenderer = (props) => {
//             console.log(props.data, "iam12333iam12333");
//     // let pricearrname =[];
//     props?.data?.map((items)=>{
//       // pricearrname.push(items.typename)
//           // console.log(items,"items")
//   })
//   return (
//     <>
//        <span>{}</span>
//     </>
//   );
// };

  const ChildMessageRenderer = (props) => {
    return (
      <div className="iconActionList">
        <div className="editIcon"
        onClick={() => {
          console.log(props, "VIEW");

          setUpdateCServiceData(props.data);
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
          console.log(props, "VIEW");
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

  function addService() {
   
    var data = new FormData();
    data.append("title", title);
    data.append("category", category);
    data.append("subcategory", subcategory);
    data.append("Plans", PlanId);
    data.append("image", addimage);

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
        getService()
        console.log(response.data, "add Category");
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    getCategory();
     getSubCategory();
     getPlanService();
     getService();
  }, []);


  // ------GET SERVICE API-------//

  function getService() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getservice`,
      headers: {
        Authorization: localStorage.getItem("token"),
        
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response,"GERSERVICE")
        
        
        setRowData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // ------GET CATEGORY API-------//

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
        console.log(response.data.getdata,"catget1")
        let catArr=[];
        response.data.getdata.map((item)=>{
          catArr.push({label:item.title,value:item._id});
        })
        setCategoryselect(catArr);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

// ------SELECT CHANGE FUNCTION FOR CATEGORY-------//

 const handleCategory = (e) =>{
setCatSelect(e.value)
  }

  // ------GET SUBCATEGORY API-------//

function getSubCategory(){
  var config = {
    method: "get",
    url:`${process.env.REACT_APP_BASEURL}/get-sub-category`,
    headers:{
    Authorization: localStorage.getItem("token"),
    },
  };
  axios(config).then(function(response){
console.log(response,"response333")
let subCatArr =[];
response.data.data.map((item)=>{
  subCatArr.push({label:item.title,value:item._id})
})
  setSubCategorySelect(subCatArr);
  }).catch(function(error){
    console.log(error);
  })

}

const handleSubCategory=(e)=>{
  // console.log(e.label,"subcat")
  let handArr=[];
  e.forEach((value)=>{
    handArr.push(value.value)
  })
  setSubCatSelect(handArr)
  console.log(handArr,"handArr")

}


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
  
  setPlanId(e.value)
  }

  function servicedeleteData(id) {
    var data = JSON.stringify({
      servicecategoryId: id,
    });
    console.log(data);

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
        getService()
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  const editdataReloadFunc = () => {
    getCategory();
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
              Service Parts
                <div className="float-end btns_head">
                  <button
                    className="btn btn-theme btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#createGroup"
                  >
                    Add New  Service Parts
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
                          Add  Service Parts
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
                            <label className="form-label"> Select Category</label>
                            <div className="position-relative">
                              <Select
                              options={categoryselect}
                               onChange={(e) =>handleCategory(e)}
                              />
                              <div
                                className="hint_box"
                                style={{ display: "block" }}
                              ></div>
                            </div>
                          </div>
                          <div className="col-md-12 mb-3">
                            <label className="form-label"> Select Sub Category</label>
                            <div className="position-relative">
                              <Select
                              isMulti
                            options={subCategorySelect}
                            onChange={(e)=>handleSubCategory(e)}
                               
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
                            <label className="form-label"> Service Parts Name</label>
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
                            <label className="form-label">Icon</label>
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
                          onClick={addService}
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
                    <ServiceUpdat
                      updatedData={UpdateCServiceData}
                      onEditDataFunction={getService}
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
                            <p>Are you sure you want to delete this  service?</p>
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
                                servicedeleteData(DeleteDeleteId);
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
                                    <h6> Category  : {Viewuser.title}</h6>
                                  </div>
                                  <div>
                                    {" "}
                                    <h6> Category image : <img src={Viewuser.image}/> </h6>
                                   
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
                    // moodRenderer: MoodRenderer,
                    srNoRenderer: SrNoRenderer,
                    statusRenderer: StatusRenderer,
                    imageRender: imageRerander,
                    // PriceNameRenderer:PriceNameRenderer,

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
                    field="title"
                    headerName="Service"
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

export default Serviceparts;
