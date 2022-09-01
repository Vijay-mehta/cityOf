

import React, { useState,useEffect } from "react";
import axios from "axios";
import Footer from "../../shared/Footer/footer";
import Select from "react-select";

const ServiceUpdat = (props) => {
    console.log(props,"props")
    const [catId, setCaeId] = useState("");
    const [CatSelect, setcatChang] = useState("");
    const [Plan, setPlan] = useState([]);
    const [planId, setPlanId] = useState([]);
   
  const [title, setService] = useState("");
  const [subCatChang, setSubCatChang] = useState([]);
  const [seubCatId, setSubCatId] = useState([]);
  const [image, setImage] = useState("");
  
  const [disImage, setDisImage] = useState("");
  function updateServiceData() {
    // console.log(props,'update123')


    var data = new FormData();
    data.append("servicecategoryId", props.updatedData?._id);
    data.append(
      "title", title === "" || null ? props.updatedData?.title  : title);
  
        data.append(
          "category",
          catId.toString() === "" || null ? props.updatedData?.category?.map((item) => 
          { return item._id }).toString()
    
            : catId
        );
        
        data.append(
          "subcategory",
          seubCatId.toString() === "" || null ? props.updatedData?.subcategory?.map((item) => 
          { return item._id }).toString()
    
            : seubCatId
        );

        data.append(
          "Plans",
          planId.toString() === "" || null ? props.updatedData?.Plans?.map((item) => 
          { return item._id }).toString()
    
            : planId
        );
        
    data.append(
      "image",
      image === "" || null ? props.updatedData?.image : image
    );

  
    console.log(data);

    var config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASEURL}/editService`,
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        // window.location.reload(false);
        props.onEditDataFunction();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    
    subCategoryGet();
    getCategory()
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
          
          let arrSubCat=[];
          response.data.data.map((catSubName)=>{
            arrSubCat.push({label: catSubName.title,value: catSubName._id})
          });
          setSubCatChang(arrSubCat);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleChangeSubCategory=(e)=>{
   let subarrSelect=[];
   e.forEach((item)=>{
    subarrSelect.push(item.value)
   })
   setSubCatId(subarrSelect)
   console.log(subarrSelect,"subarrSelect")
   
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
        console.log(response, "plan");
        let planarr = [];
        response.data.data.map((item) => {
          planarr.push({ label: item.planName, value: item._id });
        });
        console.log(planarr, "planarr");
        setPlan(planarr);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  const handleChangePlan = (e) => {

    console.log(e.value,"element")
    setPlanId(e.value)
    
  };
  const IconImage = (event) => {
    if (event.target.files[0]) {
      let file = event.target.files[0];
      let display = URL.createObjectURL(file);
      setDisImage(display);
      setImage(event.target.files[0]);
    }
  };

    const renderImages = (image) => {
        return (
          <img
            style={{ width: "110px", height: "140px" }}
            src={image}
            key={image}
          />
        );
      };

  return (<>
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLabel">
        Edit Service
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
          <label className="form-label">Edit Category </label>
          <div className="position-relative">
            {/* <input
              type="text"
              defaultValue={props.updatedData?.category?.title}
              className="form-control"
              onChange={(e) => handleChangeCategory(e)}

            /> */}

                                 <Select
                                // isMulti
                                defaultValue={props.updatedData?.category?.map((item) => { 
                                  console.log(item,"special")
                                  return { value: item._id, label: item.title } })}
                                  key={props.updatedData?.category?.map((item) => { return item._id })}
                              options={CatSelect}
                              onChange={(e) => {
                              
                                handleChangeCategory(e)
                            }}
                              // onChange={(e) => handleChangeSubCategory(e)}
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
          <label className="form-label">Edit Sub Category </label>
          <Select
         isMulti
         defaultValue={props.updatedData?.subcategory?.map((item) => { 
          console.log(item,"special")
          return { value: item._id, label: item.title } })}
          key={props.updatedData?.subcategory?.map((item) => { return item._id })}
        options={subCatChang}
        onChange={(e) => {
          e.persist = () => { }
          handleChangeSubCategory(e)
      }}
        //  onChange={(e) => handleChangeSubCategory(e)}
         className="basic-multi-select"
         classNamePrefix="select"
                            />
        </div>
        <div className="col-md-12 mb-3">
          <label className="form-label">Edit Plan </label>
          <div className="position-relative">
            {/* <input
              type="text"
              defaultValue={props.updatedData?.Plans?.planName}
              className="form-control"
              onChange={(e) => {
                setPlan(e.target.value)
              }}
            /> */}


                  <Select
                // isMulti
                defaultValue={props.updatedData?.Plans?.map((item) => { 
                  console.log(item,"special")
                  return { value: item._id, label: item.planName } })}
                  key={props.updatedData?.Plans?.map((item) => { return item._id })}

              
               
                options={Plan}
                // onChange={(e) => handleChangePlan(e)}

                onChange={(e) => {

                  handleChangePlan(e)
              }}

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
          <label className="form-label">Edit Service </label>
          <div className="position-relative">
            <input
              type="text"
              defaultValue={props.updatedData?.title}
              className="form-control"
              onChange={(e) => {
                setService(e.target.value)
              }}
            />
            <div
              className="hint_box"
              style={{ display: "block" }}
            ></div>
          </div>
        </div>
      
        <div className="col-md-12 mb-3">
            <label className="form-label d-block">Edit Image</label>
                <input type="file" className="form-control" onChange={IconImage} />
                {!disImage ? (
                  <img className="mt-2" 
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    src={props.updatedData?.image}
                  />
                ) : (
                  renderImages(disImage)
                )}
          </div>
      
       
      
      </div>
      
      
    </div>
    <div className="modal-footer">
      <button type="button" className="btn btn-danger CancelBtn" data-bs-dismiss="modal"
      >Cancel</button>
      <button
        type="submit"
        onClick={updateServiceData}
        className="btn submitBtn" data-bs-dismiss="modal">
        Submit
      </button>
    </div>

  </>)
}

export default ServiceUpdat;