import React from "react";
import {Switch, Route } from "react-router-dom";
import {BrowserRouter as Router} from "react-router-dom";
import Home from "./routes/Home";
import AddServices from "./routes/AddServices";
import AddTiming from "./routes/AddTimeing";
import Icsexport from "./routes/Icsexport";
import BusinessDetail from "./routes/BusinessDetail";
import { BusinessContextProvider } from "./context/BusinessContext";


const App = () => {
    return (
        <BusinessContextProvider>
 <div className="container py-5">
        <div className="row">
            <div className="col-md-4 offset-md-4">
        <Router>
        <Switch>  
            <Route exact path="/" component={Home} />
            <Route exact path="/business/:id/time" component={AddTiming} />
            <Route exact path="/business/:id" component={BusinessDetail} />
            <Route exact path="/business/:id/services" component={AddServices} />
            <Route exact path="/business/:id/icsexport" component={Icsexport} />
        </Switch>
        </Router>
        </div>
        </div>
    </div>
        </BusinessContextProvider>
       
    );
};

export default App;     