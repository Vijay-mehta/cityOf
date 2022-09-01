import React from "react";
import { NavLink } from "react-router-dom";
import "../../loader.js";
import { AiFillAppstore } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { AiOutlinePoweroff } from "react-icons/ai";
import { AiFillSetting } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import "./Sidebar.css";


function Sidebar() {
  return (
    <aside className="left-sidebar col-md-4">
      <div className="scroll-sidebar">
        <nav className="sidebar-nav">
          <ul id="sidebarnav">
            <h5>Menu</h5>
            <li className="sidebar-item">
              <NavLink
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="/dashboard"
                aria-expanded="false"
              >
                <AiFillAppstore />
                <span className="hide-menu">DashBoard</span>
              </NavLink>
            </li>

            <li className="sidebar-item">
              <NavLink
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="/Order"
                aria-expanded="false"
              >
                <FaUsers />
                <span className="hide-menu">Order</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="/User"
                aria-expanded="false"
              >
                <FaUsers />
                <span className="hide-menu">User</span>
              </NavLink>
            </li>
            
            <li className="sidebar-item">
              <NavLink
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="/Scout"
                aria-expanded="false"
              >
                <FaUsers />
                <span className="hide-menu">Scout</span>
              </NavLink>
            </li>

           
{/* 
            <li className="sidebar-item">
              <NavLink
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="/Service"
                aria-expanded="false"
              >
                <FaUsers />
                <span className="hide-menu">Service</span>
              </NavLink>
            </li> */}

            <li className="sidebar-item">
              <NavLink
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="/Plan"
                aria-expanded="false"
              >
                <FaUsers />
                <span className="hide-menu">Plan Managment</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="/Serviceparts"
                aria-expanded="false"
              >
                <FaUsers />
                <span className="hide-menu">Service parts</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="/Category"
                aria-expanded="false"
              >
                <FaUsers />
                <span className="hide-menu">Category</span>
              </NavLink>
            </li>

            <li className="sidebar-item">
              <NavLink
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="/Subcategory"
                aria-expanded="false"
              >
                <FaUsers />
                <span className="hide-menu">Subcategory</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="/Citys"
                aria-expanded="false"
              >
                <FaUsers />
                <span className="hide-menu">CityMaster</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="/Brand"
                aria-expanded="false"
              >
                <FaUsers />
                <span className="hide-menu">Brands</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="/Fuel"
                aria-expanded="false"
              >
                <FaUsers />
                <span className="hide-menu">Fuels</span>
              </NavLink>
            </li>

            <li className="sidebar-item">
              <NavLink
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="/CarCategory"
                aria-expanded="false"
              >
                <FaUsers />
                <span className="hide-menu">CarCategory</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="/Cars"
                aria-expanded="false"
              >
                <FaUsers />
                <span className="hide-menu">CarMaster</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="/InspectionCategory"
                aria-expanded="false"
              >
                <FaUsers />
                <span className="hide-menu">InspectionCategory</span>
              </NavLink>
            </li>

            <div class="dropdown">
  <a class="btn btn-ligh dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown link
  </a>

  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div>

            <li class="sidebar-item">
              <a
                class="sidebar-link has-arrow waves-effect waves-dark"
                href="javascript:void(0)"
                aria-expanded="false"
              >
                <FaList />
                <span class="hide-menu">CMS Pages</span>
              </a>
              <ul aria-expanded="false" class="collapse first-level">
                
                <li className="sidebar-item">
                  <NavLink
                    className="sidebar-link waves-effect waves-dark sidebar-link"
                    to="/About"
                    aria-expanded="false"
                  >
                    <FaUsers />
                    <span className="hide-menu">About Us</span>
                  </NavLink>
                </li>
                <li class="sidebar-item">
                  <a href="javascript:void(0);" class="sidebar-link">
                    <i class="mdi mdi-adjust"></i>
                    <span class="hide-menu">FAQ</span>
                  </a>
                </li>
                <li class="sidebar-item">
                  <a href="javascript:void(0);" class="sidebar-link">
                    <i class="mdi mdi-adjust"></i>
                    <span class="hide-menu">Privacy Policy</span>
                  </a>
                </li>
                <li class="sidebar-item">
                  <a href="javascript:void(0);" class="sidebar-link">
                    <i class="mdi mdi-adjust"></i>
                    <span class="hide-menu">Terms & Conditions</span>
                  </a>
                </li>

                <li class="sidebar-item">
                  <a
                    class="has-arrow sidebar-link"
                    href="javascript:void(0)"
                    aria-expanded="false"
                  >
                    <i class="mdi mdi-playlist-plus"></i>
                    <span class="hide-menu">Blog</span>
                  </a>
                  <ul aria-expanded="false" class="collapse second-level">
                    <li class="sidebar-item">
                      <a href="javascript:void(0);" class="sidebar-link">
                        <i lass="mdi mdi-octagram"></i>
                        <span class="hide-menu">Blog Category</span>
                      </a>
                    </li>
                    <li class="sidebar-item">
                      <a href="javascript:void(0);" class="sidebar-link">
                        <i lass="mdi mdi-octagram"></i>
                        <span class="hide-menu">Blog List</span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li class="sidebar-item">
              <a
                class="sidebar-link has-arrow waves-effect waves-dark"
                href="javascript:void(0)"
                aria-expanded="false"
              >
                <FaList />
                <span class="hide-menu">Support</span>
              </a>
              <ul aria-expanded="false" class="collapse first-level">
                <li class="sidebar-item">
                  <a href="/user" to="/user" aria-expanded="false">
                    <span className="hide-menu">Users</span>
                  </a>
                </li>
                <li class="sidebar-item">
                  <a href="javascript:void(0);" class="sidebar-link">
                    <i class="mdi mdi-adjust"></i>
                    <span class="hide-menu">Scout</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      <div className="sidebar-footer">
        <NavLink to="/" className="link" title="Settings">
          <AiFillSetting />
        </NavLink>
        <NavLink to="/" className="link" title="Help Resources">
          <BiHelpCircle />
        </NavLink>
        <NavLink to="/" className="link" title="Logout">
          <AiOutlinePoweroff />
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;
