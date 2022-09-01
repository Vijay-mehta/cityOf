import React, { useMemo, useState, useEffect,useRef} from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
// import Updateusers from "./UpdateUser";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import Header from "../Header/header";
import Sidebar from "../Sidebar/sidebar";
import { AiFillEye } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import JoditEditor from "jodit-react";





function About() {
  const [content, setContent] = useState("");
  const editor = useRef(null);
  const [rowData, setRowData] = useState([]);
  // const[view ,setView] =useState("")
  const pagination = true;
    const paginationPageSize = 10;
    const rowHeight = 55;


    const config = {
      readonly: false,
      height: 400,
    };
  
 
    function addAboutUs() {
       var data = JSON.stringify({
       "About": content,
    
       });
      
      var config = {
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}/Cms`,
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
          getAboutUs();
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    useEffect(() => {
      getAboutUs();
    }, []);
  
    function getAboutUs() {
      var config = {
        method: "get",
        url: `${process.env.REACT_APP_BASEURL}/getCms`,
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
  

  
  
  return (
    <>
      <Header />
      <Sidebar />

      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                About
                <div className="float-end btns_head">
                  <button
                    className="btn btn-theme btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#createGroup"
                  >
                    Add New About
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
                          Add About
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
                        <div className="col-md-12">
                            <label className="form-label">
                              Article  Description
                            </label>
                            <div className="App">
                              <JoditEditor
                                ref={editor}
                                // value={singleService.article}
                                config={config}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={(newContent) =>{
                                  //  singleService.article=newContent 
                                   ;return setContent(newContent);}} // preferred to use only this option to update the content for performance reasons
                                onChange={(newContent) => {}}
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
                          onClick={addAboutUs}
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
                  {/* <div className="modal-content">
                    <Updateusers
                      updatedData={UpdateStudentData}
                      onEditDataFunction={editdataReloadFunc}
                    />
                  </div> */}
                </div>
              </div>
        

              {/* <div
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
                    // childMessageRenderer: ChildMessageRenderer,
                    // statusRenderer: StatusRenderer,
                  }}
                >
                    <AgGridColumn
                    width={900}
                    field="About"
                    dangerouslySetInnerHTML={{__html: About}}
                    sortable={false}
                    filter={false}
                    // cellRenderer="EmailRender"
                  ></AgGridColumn>
                      
                </AgGridReact>
              </div> */}
              
            </div>
          </div>
   
        </div>
               
    
      </div>
    </>
  );
}

export default About;
