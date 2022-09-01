import { BrowserRouter as Router,  Route,  Redirect,  Switch,} from "react-router-dom";
import Cars from "./shared/cars/cars";
import Category from "./shared/category/category";
import Login from "./shared/Login/login"
 import Scout from "./shared/Scout/Scout";
import User from "./shared/users/user";
import Dashboard from "./shared/Dashboard/dashboard";
import City from "./shared/citys/cityes";
import service from "./shared/service/service"
import Userview from "./shared/users/Userview";
import About from "./shared/CmsPages/About";
import Brand from "./shared/brand/brand";
import Fuel from "./shared/fuel/fuel";
import CarCategory from "./shared/CarCategory/CarCategory";
import ScoutView from "./shared/Scout/ScoutView";
import Order from "./shared/Order/Order";
import OrderView from "./shared/Order/OrderView";
import Addservice from "./shared/service/Addservice";
import Subcategory from "./shared/Subcategory/Subcategory";
import Plan from "./shared/Plan/Plan";
import AddPlan from "./shared/Plan/Addplan";
import Serviceparts from './shared/Serviceparts/Serviceparts'
import PlanView from "./shared/Plan/PlanView";
import Input from "./Components/Input";
import SubCategoryView from "./shared/Subcategory/SubCategoryView";
import "./index.css"
import PlanUpdate from "./shared/Plan/PlanUpdate";
import AddCar from "./shared/cars/AddCar";
import ViewCar from "./shared/cars/ViewCar";
import UpdateCars from "./shared/cars/updateCar";
import OrderAssign from "./shared/Order/OrderAssign";
import InspectionCategory from "./shared/InspectionCategory/InspectionCategory";
function App() {
  console.log("hello this is app.js")
  return (
    <div>
     
      <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/User" component={User}/>
          <Route exact path="/Cars" component={Cars}/>
          <Route exact path="/Category" component={Category}/>
          <Route exact path="/Citys"component={City}/>
          <Route exact path="/Service"component={service}/>
          <Route exact path="/Scout" component={Scout}/>
          <Route exact path="/Userview" component={Userview}/>
          <Route exact path="/About" component={About}/>
          <Route exact path="/Brand" component={Brand}/>
          <Route exact path="/Fuel" component={Fuel}/>
          <Route exact path="/CarCategory" component={CarCategory}/>
          <Route exact path="/ScoutView" component={ScoutView}/>
          <Route exact path="/Order" component={Order}/>
          <Route exact path="/OrderView" component={OrderView}/>
          <Route exact path="/Addservice" component={Addservice}/>
          <Route exact path="/Subcategory" component={Subcategory}/>
          <Route exact path="/plan" component={Plan}/>
          <Route exact path="/addplan" component={AddPlan}/>
          <Route exact path="/serviceparts" component={Serviceparts}/>
          <Route exact path="/planView" component={PlanView}/>
          <Route exact path="/subCategoryView" component={SubCategoryView}/>
          <Route exact path="/planUpdate" component={PlanUpdate}/>
          <Route exact path="/addCar" component={AddCar}/>
          <Route exact path="/viewCar" component={ViewCar}/>
          <Route exact path="/updateCars" component={UpdateCars}/>
          <Route exact path="/orderAssign" component={OrderAssign}/>
          <Route exact path="/inspectionCategory" component={InspectionCategory}/>

          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
