import React, { useMemo, useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import UpdateCategory from "./Updatecategory";

import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import Header from "../../shared/Header/header";
import Sidebar from "../../shared/Sidebar/sidebar";
import { AiFillEye } from "react-icons/ai";
import Input from "../../Components/Input";

function Category() {
  const [DeleteDeleteId,setDeleteDeleteId] = useState("")
  const [UpdateCategoryData, setUpdateCategoryData] = useState([]);
  const [Viewuser, setViewuser] = useState([]);
  const [title, setTitle] = useState("");
  const [discreption, setDiscreption] = useState("");
  const [addimage, setimage] = useState("");
  const [rowData, setRowData] = useState([]);
  const pagination = true;
  const paginationPageSize = 20;
  const rowHeight = 55;

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
         onClick={() => {
          setUpdateCategoryData(props.data);
        }}
        data-bs-toggle="modal"
        data-bs-target="#UpdateStudentsData"
        >
          <MdModeEditOutline
            className="ActionIcon viewicon"
           
          />
        </div>
        {/* <div className="ViewIcon">
          <AiFillEye
            onClick={() => {
              console.log(props, "propstyty");
              setViewuser(props.data);
            }}
            data-bs-toggle="modal"
            data-bs-target="#UserViewId"
            alt=""
            src="../../images/view.jpg"
          />
        </div> */}
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

  function addCategory() {
   
    var data = new FormData();
    data.append("title", title);
    data.append("discreption", discreption);
    data.append("image", addimage);
    data.append("parentsid", null);

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/category`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
        
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getCategory();  
        resetForm();      
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const resetForm = () => {
	
    setTitle('');
    setDiscreption('');
    setimage('');
    setimage('');
	  };


    // axios.get(`${process.env.REACT_APP_BASEURL}/getcategory`).then(function(response){
    //   console.log(response,"morning")
    // })

    // useEffect(() => {
   
    //   res()
    // }, []);

//  axios.get('http://54.221.3.19:3200/admin/getcategory', {
//  headers: {
//         Authorization: localStorage.getItem("token"),
//  }
// }).then(function(response){
//   setRowData(response.data.getdata);
// }) .catch(function (error) {
//          console.log(error);
//  });;


// res.data.headers[Authorization]; // "test-value"


  useEffect(() => {
   
     getCategory();
  }, []);

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
        console.log(response,"catget")
        setRowData(response.data.getdata);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function CategorydeleteData(index) {
    var data = JSON.stringify({
      categoryid: index,
    });
    console.log(data);

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/deleteCategory`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
         getCategory();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function CategoryEdit(index) {
    var data = JSON.stringify({
      "categoryid": index,
    });
      var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/editCategory`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      
    };

    axios(config)
      .then(function (response) {
       
        // getCategory();

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const editdataReloadFunc = () => {
    // getCategory();
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
                Category
                <div className="float-end btns_head">
                  <button
                    className="btn btn-theme btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#createGroup"
                  >
                    Add New Category
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
                          Add Category
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <form>
                      <div className="modal-body">
                        <div className="row">
                          <div className="col-md-12 mb-3">
                            <label className="form-label">Category Name</label>
                            <div className="position-relative">
                              <Input style="form-control"
                              onChange={(e) => {
                                console.log(e,"thisisevent")
                                setTitle(e?.target?.value);
                              }}/>
                              {/* <input
                                type="text"
                                className="form-control"
                                value={title}
                                onChange={(e) => {
                                  setTitle(e.target.value);
                                }}
                              /> */}
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
                          onClick={addCategory}
                          type="button"
                          className="btn submitBtn"
                          data-bs-dismiss="modal"
                        >
                          Submit
                        </button>
                      </div>
                      </form>
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
                    <UpdateCategory
                      updatedData={UpdateCategoryData}
                      onEditDataFunction={getCategory}
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
                            <p>Are you sure you want to delete this Category?</p>
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
                                CategorydeleteData(DeleteDeleteId);
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
                                    <h6> Category Discreption : {Viewuser.discreption}</h6>
                                  </div>
                                  <div>
                                    {" "}
                                    <h6> Category Discreption : <img src={Viewuser.image}/> </h6>
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
                  paginationPageSize={paginationPageSize}
                  rowData={rowData}
                  domLayout="autoHeight"
                  // defaultColDef={defaultColDef}
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
                    field="title"
                    headerName="category"
                    sortable={false}
                    filter={false}
                    cellRenderer="MoodRendererfour"
                  ></AgGridColumn>
                    <AgGridColumn
                    width={160}
                    field="discreption"
                    sortable={false}
                    filter={false}
                    cellRenderer="MoodRendererfour"
                  ></AgGridColumn>
                  <AgGridColumn
                    width={200}
                    field="image"
                    sortable={false}
                    filter={false}
                    cellRenderer="imageRender"
                  ></AgGridColumn>
                  
                     <AgGridColumn
                    cellRenderer="statusRenderer"
                    width={150}
                    field="status"
                    sortable={false}
                    filter={false}
                  ></AgGridColumn>
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

export default Category;
