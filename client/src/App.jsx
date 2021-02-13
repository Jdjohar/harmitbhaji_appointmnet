import React from "react";
import {Switch, Route } from "react-router-dom";
import {BrowserRouter as Router} from "react-router-dom";
import Home from "./routes/Home";
import AddServices from "./routes/AddServices";
import AddTiming from "./routes/AddTimeing";
import Icsexport from "./routes/Icsexport";
import Loginpage from "./routes/Login"
import BusinessDetail from "./routes/BusinessDetail";
import Dashboard from "./routes/Dashboard";
import Holiday from "./routes/Holiday";
import { BusinessContextProvider } from "./context/BusinessContext";
import "../src/path/style.css"


const App = () => {
    return (
        <BusinessContextProvider>
 <div className="container py-5">
        <div className="row">
            
        <Router>
        <Switch>  
            <Route exact path="/" component={Home} />
            <Route exact path="/business/:id/time" component={AddTiming} />
            <Route exact path="/business/:id" component={BusinessDetail} />
            <Route exact path="/business/:id/services" component={AddServices} />
            <Route exact path="/business/:id/holiday" component={Holiday} />
            <Route exact path="/business/:id/icsexport" component={Icsexport} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/login" component={Loginpage} />
        </Switch>
        </Router>
       
        </div>
    </div>
        </BusinessContextProvider>
       
    );
};

export default App;     