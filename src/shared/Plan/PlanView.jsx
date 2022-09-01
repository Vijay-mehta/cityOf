
import React from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Header from "../../shared/Header/header";
import Sidebar from "../../shared/Sidebar/sidebar";
import { useLocation } from "react-router-dom";
import "./PlanView.css";
import { useHistory } from "react-router-dom";


function PlanView(props) {
    let location = useLocation();
    let history = useHistory();


    // console.log(location.state.details,"arrPrice")
  
  let arrServiceParts=[];
  let arrCategory=[];
  let arrSubCategory=[];



   location.state?.details?.services_id.map((item)=>{
    arrServiceParts.push(item.title)
   }
   
   )

   location.state?.details?.Category.map((item)=>{
    arrCategory.push(item.title)
   }
   
   )

   location.state?.details?.Subcategory.map((item)=>{
    arrSubCategory.push(item.title)
   }
   
   )

  return (
    <>
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="row">
            
            
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
                          <span>Plan Details</span>
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
                              <th>Plan Name</th>
                              <td>{location.state?.details.planName}</td>
                            </tr>
                            <tr>
                              <th>Plan Price</th>
                              <td>{location.state?.details.typeprice}</td>
                            </tr>
                            <tr>
                              <th>Plan Type Name</th>
                              <td>{location.state?.details.typename}</td>
                            </tr>
                            <tr>
                              <th>Service Pack</th>
                              <td>{location.state?.details?.servicepack}</td>
                            </tr>
                            <tr>
                              <th>Service Pack Price</th>
                              <td>{location.state?.details?.servicepackprice}</td>
                            </tr>
                            
                            <tr>
                              <th>Service Type Name</th>
                              <td>{location.state?.details?.servicename}</td>

                              
                            </tr>
                            <tr>
                              <th>Category</th>
                              <td>
                              {arrCategory}

                              </td>
                            </tr>
                            <tr>
                              <th>Sub Category</th>
                              <td>
                              {arrSubCategory?.join(',  ')}

                              </td>
                            </tr>
                            <tr>
                              <th>Service Parts Name </th>
                              <td>
                              {arrServiceParts.join(', ')}

                              </td>
                            </tr>
                          
                            <tr>
                              <th>Label </th>
                              <td>
                              {location.state?.details?.label}

                              </td>
                            </tr>
                            <tr>
                              <th>Time </th>
                              <td>
                              {location.state?.details?.hours}

                              </td>
                            </tr>
                            <tr>
                              <th>Month </th>
                              <td>
                              {location.state?.details?.month}

                              </td>
                            </tr>
                            <tr>
                              <th>Heading </th>
                              <td>
                              {location.state?.details?.heading}

                              </td>
                            </tr>
                            <tr>
                              <th>Text Field </th>
                              <td>
                              {location.state?.details?.textField}

                              </td>
                            </tr>

                            <tr>
                              <th>Description </th>
                              <td>
                              {location.state?.details?.description}

                              </td>
                            </tr>
                            
                          </tbody>
                        </table>
                        
                      </div>
                     
                    </div>
                    
                  </div>
                  <button
                type="button"
                className="btn btn-danger CancelBtn"
                onClick={() => { history.push("./Plan") }}
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
export default PlanView;
