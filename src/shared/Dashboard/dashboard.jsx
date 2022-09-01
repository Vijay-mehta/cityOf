import React, { useEffect,useState } from "react";
import Header from "../../shared/Header/header";
import Footer from "../../shared/Footer/footer";
import Sidebar from "../../shared/Sidebar/sidebar";
import axios from "axios";
import "./dashboard.css";

function Dashboard() {
    const [dashboardData,setDashboardData] = useState("");
	useEffect(()=>{
        if(dashboardData == ""){
            getDashboard();
        }
        
	},[]);

	 function getDashboard(){
        var config = {
            method: 'get',
            url: `${process.env.REACT_APP_BASEURL}/dashbord`,
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Authorization" : localStorage.getItem("token")
            },
        };
        axios(config).then(function (response) {
            console.log(response,"6666")
            setDashboardData(response.data.data)

        })
        .catch(function (error) {
            console.log("error >>>>>>>>>>>>>>>> ",error);
            setDashboardData("")
        });
    }

	return (
		<>
			<Header />
			<Sidebar />
			<div className="page-wrapper">
				<div  className="container-fluid min_height">
                {dashboardData ?
                
                    <div className="row">
                        <div class="col-xl-3 col-md-6 mb-3">
                            <div class="box bg-white">
                                <a href="#">
                                    <div class="box-row flex-wrap">
                                        <div class="box-content">
                                            <div class="text-muted text-uppercase font-weight-bold small"> Order</div>
                                            <h6 class="h1 m-0"><i class="fal fa-users"></i> {dashboardData.order}</h6>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="col-xl-3 col-md-6 mb-3">
                            <div class="box bg-white">
                                <a href="#">
                                    <div class="box-row flex-wrap">
                                        <div class="box-content">
                                            <div class="text-muted text-uppercase font-weight-bold small"> User</div>
                                            <h6 class="h1 m-0"><i class="fal fa-users"></i> {dashboardData.users}</h6>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="col-xl-3 col-md-6 mb-3">
                            <div class="box bg-white">
                                <a href="#">
                                    <div class="box-row flex-wrap">
                                        <div class="box-content">
                                            <div class="text-muted text-uppercase font-weight-bold small"> Scout</div>
                                            <h6 class="h1 m-0"><i class="fal fa-users"></i> {dashboardData.Scout}</h6>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="col-xl-3 col-md-6 mb-3">
                            <div class="box bg-white">
                                <a href="#">
                                    <div class="box-row flex-wrap">
                                        <div class="box-content">
                                            <div class="text-muted text-uppercase font-weight-bold small">citys</div>
                                            <h6 class="h1 m-0"><i class="fal fa-users"></i> {dashboardData.citys}</h6>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        {/* <div class="col-xl-3 col-md-6 mb-3">
                            <div class="box bg-white">
                                <a href="#">
                                    <div class="box-row flex-wrap">
                                        <div class="box-content">
                                            <div class="text-muted text-uppercase font-weight-bold small">Brands</div>
                                            <p class="h1 m-0"><i class="fal fa-users"></i> {dashboardData.brands}</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div> */}
                        <div class="col-xl-3 col-md-6 mb-3">
                            <div class="box bg-white">
                                <a href="#">
                                    <div class="box-row flex-wrap">
                                        <div class="box-content">
                                            <div class="text-muted text-uppercase font-weight-bold small"> Cars</div>
                                            <h6 class="h1 m-0"><i class="fal fa-users"></i> {dashboardData.cars}</h6>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        {/* <div class="col-xl-3 col-md-6 mb-3">
                            <div class="box bg-white">
                                <a href="#">
                                    <div class="box-row flex-wrap">
                                        <div class="box-content">
                                            <div class="text-muted text-uppercase font-weight-bold small">services</div>
                                            <p class="h1 m-0"><i class="fal fa-users"></i>{dashboardData.services}</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div> */}
                        {/* <div class="col-xl-3 col-md-6 mb-3">
                            <div class="box bg-white">
                                <a href="#">
                                    <div class="box-row flex-wrap">
                                        <div class="box-content">
                                            <div class="text-muted text-uppercase font-weight-bold small">categories</div>
                                            <p class="h1 m-0"><i class="fal fa-users"></i> {dashboardData.categories}</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div> */}
                        {/* <div class="col-xl-3 col-md-6 mb-3">
                            <div class="box bg-white">
                                <a href="#">
                                    <div class="box-row flex-wrap">
                                        <div class="box-content">
                                            <div class="text-muted text-uppercase font-weight-bold small">sub_categories</div>
                                            <p class="h1 m-0"><i class="fal fa-users"></i> {dashboardData.sub_categories}</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div> */}
{/*                 
                        <div class="col-xl-3 col-md-6 mb-3">
                            <div class="box bg-white">
                                <a href="#">
                                    <div class="box-row flex-wrap">
                                        <div class="box-content">
                                            <div class="text-muted text-uppercase font-weight-bold small">fuels</div>
                                            <p class="h1 m-0"><i class="fal fa-users"></i> {dashboardData.fuels}</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div> */}
                        {/* <div class="col-xl-3 col-md-6 mb-3">
                            <div class="box bg-white">
                                <a href="#">
                                    <div class="box-row flex-wrap">
                                        <div class="box-content">
                                            <div class="text-muted text-uppercase font-weight-bold small"> comman</div>
                                            <p class="h1 m-0"><i class="fal fa-users"></i> {dashboardData. comman}</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div> */}
                    </div>
                 : "NO DATA FOUND"}
					

				</div>
			</div>
			<Footer />
		</>
	);
}

export default Dashboard;