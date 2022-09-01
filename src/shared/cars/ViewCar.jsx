



import React from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Header from "../../shared/Header/header";
import Sidebar from "../../shared/Sidebar/sidebar";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";


function ViewCar(props) {
    let location = useLocation();
    let history = useHistory();

    let Branddata=[];

    console.log(location.state.details.brand.brands,"arrPrice")

//    let brandData =location.state.details;

//    let dataBrand=[];
  
    // for(var i in brandData){
    //     console.log(brandData.brand.brands,"pp")

    //     dataBrand.push(brandData.brand.brands,"pp")
    // }
  
//   let arrServiceParts=[];
//   let arrCategory=[];
  let arrfuels=[];



   location.state?.details?.fuel?.map((item)=>{
    arrfuels.push(item.fuel)
   }
   
   )

//    location.state?.details?.Category.map((item)=>{
//     arrCategory.push(item.title)
//    }
   
//    )

//    location.state?.details?.Subcategory.map((item)=>{
//     arrSubCategory.push(item.title)
//    }
   
//    )

  return (
    <>
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="row">
            
          <div class="col-12">
             
                <div class="card-body">
                  <div class="profile_box">
                  <div className="imageProfile">
                      <h4>
                      <img src={location.state.details.image}/>
                      </h4> 
                      </div>                   
                   
                  </div>
                </div>
              </div>
            
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div>
                    <ul className="nav nav-pills" role="tablist">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          data-bs-toggle="tab"
                          // href="#home"
                          role="tab"
                        >
                          <span>Car Details</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-bs-toggle="tab"
                          href="#profile"
                          role="tab"
                        >
                         
                        </a>
                      </li>
                    </ul>

                    <div className="tab-content pt-3">
                      <div className="tab-pane active" id="home" role="tabpanel">
                        <table className="table table-bordered table_fix_width">
                          <tbody>
                           
                            <tr>
                              <th>Car Name</th>
                              <td>{location.state?.details.cars}</td>
                            </tr>
                            <tr>
                              <th> Brand Name</th>
                              <td>{location.state.details.brand.brands}</td>
                            </tr>
                            <tr>
                              <th>Car Category Name</th>
                              <td>{location.state.details.carCategory.carCategory}</td>
                            </tr>
                            <tr>
                              <th>City Name</th>
                              <td>{location.state.details.city.city}</td>
                            </tr>
                            <tr>
                              <th>Fuel Name</th>
                              <td>{arrfuels.join(',  ')}</td>
                            </tr>
                            
                            
                          </tbody>
                        </table>
                        
                      </div>
                     
                    </div>
                    
                  </div>
                  <button
                type="button"
                className="btn btn-danger CancelBtn"
                onClick={() => { history.push("./Cars") }}
              >
                Cancel
              </button>
                  
                </div>
             
                
              </div>
             
            </div>
         
         
          </div>
        
        </div>
      </div>
    </>
  );
}
export default ViewCar;
