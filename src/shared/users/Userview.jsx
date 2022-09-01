import React, { useEffect, useState } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Header from "../../shared/Header/header";
import Sidebar from "../../shared/Sidebar/sidebar";
import { useLocation } from "react-router-dom";
import './Userview.css'

function Userview(props) {
  let viewBrand=[];
  let viewCar=[];
  let viewFuel=[];
 
  let location = useLocation();

  location.state.detailsone.map((item)=>{
    console.log(item,"item")
   viewBrand.push(item.brand?.brands)
   viewCar.push(item.car?.cars)
   viewFuel.push(item.fuel?.fuel)
  })
 
  
  return (
    <>
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <div class="profile_box">
                  <div className="imageProfile">
                      <h4>
                      <img src={location.state.details.image}/>
                      </h4> 
                      </div>                   <div class="profile_box_body ">
                      <div className="displeProfile">
                      
                      <div className="ContentProfile">
                      <h4 className="pb-2">{location.state.details.name}</h4>
                      <a href="javascript:void(0);">
                        <i class="mdi mdi-email-outline"></i>{" "}
                      <a href="javascript:void(0);">
                        <i class="mdi mdi-phone"></i> 
                        <h4>{location.state.details.email}</h4>                      </a>

                      </a>
                      <h4 className="pt-2">{location.state.details.mobile}</h4> 

                      </div>
                   
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="card">
                <div class="card-body">
                  <div>
                    <ul class="nav nav-pills" role="tablist">
                      <li class="nav-item">
                        <a
                          class="nav-link active"
                          data-bs-toggle="tab"
                          // href="#home"
                          role="tab"
                        >
                          <span>User Details</span>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          data-bs-toggle="tab"
                          href="#profile"
                          role="tab"
                        >
                         
                        </a>
                      </li>
                    </ul>

                    <div class="tab-content pt-3">
                      <div class="tab-pane active" id="home" role="tabpanel">
                        <table class="table table-bordered table_fix_width">
                          <tbody>
                           
                            <tr>
                              <th>Address</th>
                              <td>11/61, Madhyam Marg, Kaveri Path, Mansarovar Sector 1, Mansarovar, Jaipur, Rajasthan 302020</td>
                            </tr>
                            <tr>
                              <th>Date</th>
                              <td>{location.state.details.date}</td>
                            </tr>
                            <tr>
                              <th>State</th>
                              <td>{location.state.details.State}</td>
                            </tr>
                            <tr>
                              <th>PinCode</th>
                              <td>{location.state.details.PinCode}</td>
                            </tr>
                           
                            <tr>
                              <th>Brand</th>
                              <td>
                           <button   type="button"
                          className="btn submitBtn">
                              {viewCar}
                              </button>
                              </td>
                            </tr>
                            <tr>
                              <th>Cars</th>
                              <td>
                                <button type="button"
                          className="btn submitBtn">
                             {viewBrand}
                             </button>
                              </td>
                            </tr>
                          
                            <tr>
                              <th>Fuel </th>
                              <td>
                              <button type="button"
                          className="btn submitBtn">
                              {viewFuel}
                              </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
         
         
          </div>
          <div class="row">
            <div class="col-12">
            
            </div>
            <div class="col-md-12">
              <div class="card">
                <div class="card-body">
                  <div>
                    <ul class="nav nav-pills" role="tablist">
                      <li class="nav-item">
                        <a
                          class="nav-link active"
                          data-bs-toggle="tab"
                          // href="#home"
                          role="tab"
                        >
                          <span>User History Details</span>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          data-bs-toggle="tab"
                          href="#profile"
                          role="tab"
                        >
                        </a>
                      </li>
                    </ul>

                    <div class="tab-content pt-3">
                      <div class="tab-pane active" id="home" role="tabpanel">
                        <table class="table table-bordered table_fix_width">
                          <tbody>
                           
                      <tr>
                              <th>Brand</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th>Cars</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th>Fuel</th>
                              <td></td>
                            
                            </tr>
                            <tr>
                              <th>Category</th>
                              <td>
                             
                              </td>
                            </tr>
                            <tr>
                              <th>Address 2</th>
                              <td>
                              
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
         
         
          </div>
        </div>
      </div>
    </>
  );
}
export default Userview;
