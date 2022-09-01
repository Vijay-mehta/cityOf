import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Select from "react-select";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Footer from "../Footer/footer";
import Sidebar from "../Sidebar/sidebar";
import Header from "../Header/header";
import { useHistory } from "react-router-dom";

function Addservice() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [authorImage, setAuthorImage] = useState("");
  const [sendAuthorImage, setSendAuthorImage] = useState("");
  const [sendArticleImage, setSendArticleImage] = useState("");
  const [authorname, setAuthorname] = useState("");
  const [authordescription, setAuthorDescription] = useState("");
  const [articleImage, setArticleImage] = useState("");
  const [articleImages, setArticleImages] = useState([]);
  const [title, settitle] = useState("");
  const [subject, setSubject] = useState("");
  const [articledescription, setArticledescription] = useState("");
  // const [displayImages, setDisplayImages] = useState([])
  const [group, setGroup] = useState([]); // THIS STATE IS USED FOR "GROUP" PARAMETER FOR SECTION API

  const [rowData, setRowData] = useState({});
  const [serviceList, setServiceList] = useState([{ image: "", article: "" }]);
  const [optionsgroup, setoptionsgroup] = useState([]);
  const [selectedOptiongroup, setselectedOptiongroup] = useState([]);

  //const [displayImage, setDisplayImage] = useState([{img:""}])

  let history = useHistory();

  const [options, setoptions] = useState([]);
  const [selectedOptionone, setselectedOptionone] = useState([]);

  console.log(selectedOptionone, "selectedOptionone");

  const resetForm = () => {
    setContent("");
    setAuthorImage("");
    setAuthorname("");
    setAuthorDescription("");
    settitle("");
    setSubject("");
    setselectedOptionone("");
    // seteventLocation("");
  };
  //----get tags API--//

  const config = {
    readonly: false,
    height: 400,
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Add Services</h4>

              <div className="branchData">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row bgBox mb-3">
                      <div className="col-md-10">
                        <div className="col-md-12 mb-3">
                          <label className="form-label"> Services Name</label>
                          <input
                            // value={authorname}
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                              //   setAuthorname(e.target.value);
                            }}
                          />
                        </div>

                        <div className="col-md-12">
                          <label className="form-label">Services icon</label>
                          <input
                            // value={authorname}
                            type="file"
                            className="form-control"
                            onChange={(e) => {
                              //   setAuthorname(e.target.value);
                            }}
                          />{" "}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="row bgBox mb-3">
                      <div className="col-md-10">
                        <div className="col-md-12 mb-3">
                          <label className="form-label">
                            Services Subheading
                          </label>
                          <input
                            // value={title}
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                              //   settitle(e.target.value);
                            }}
                          />
                        </div>
                        
                  <div className="col-md-12">
                    <div className="row bgBox mb-3">
                      <div className="col-md-12 mb-3">
                        <label className="form-label"> Sub Services </label>
                        <Select
                          isMulti
                          //   options={options}
                          //   onChange={(e) => handlechangetag(e)}
                        />
                      </div>
                    </div>
                  </div>

                        {/* <div className="col-md-12">
                          <label className="form-label">Article Subject</label>
                          <input
                            // value={subject}
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                              //   setSubject(e.target.value);
                            }}
                          />
                        </div> */}
                      </div>
                      {/* <div className="col-md-12 mt-3">
                        <label className="form-label">
                          Article Brief Description
                        </label>
                        <textarea
                          type="textarea"
                          //value={articledescription}
                          className="form-control"
                          onChange={(e) => {
                            //   setArticledescription(e.target.value);
                          }}
                        />
                      </div> */}
                    </div>
                  </div>

                  {/* <div className="col-md-12">
                    <div className="row bgBox mb-3">
                      <div className="col-md-12 mb-3">
                        <label className="form-label"> Select Tags </label>
                        <Select
                          isMulti
                          //   options={options}
                          //   onChange={(e) => handlechangetag(e)}
                        />
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="col-md-12">
                    <div className="row bgBox mb-3">
                      <div className="col-md-12 mb-3">
                        <label className="form-label">Select Group</label>
                        <Select
                          isMulti
                          //    options={optionsgroup}
                          //    onChange={(e) => handlechangegroupmulti(e)}
                        />
                      </div>
                    </div>
                  </div> */}

                  <div class="col-md-12">
                    <button
                      type="button"
                      class="btn CancelBtn me-3"
                      //  onClick={()=>
                      //     {history.push("./Articles")}}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      class="btn submitBtn me-3"
                      //   onClick={AddArticles}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Addservice;
