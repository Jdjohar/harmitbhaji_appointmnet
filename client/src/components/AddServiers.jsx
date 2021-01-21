import React, { useEffect, useState } from "react"
import AddServices from '../apis/AddServices';
import { useHistory } from "react-router-dom";

const AddService = () => {

  let history = useHistory();

  const [servicename, setservicename] = useState("");
  const [servicecost, setservicecost] = useState("");
  const [servicetime, setservicetime] = useState("");
  const [weektime_id, setweektime_id] = useState("");
  const [business_id, setbusiness_id] = useState("");

    return (
        <div className="Services">
<form action="">
        <div className="form-group">
            <label>Enter in each Service with its cost and duration</label>
            <input 
             value={servicename}
             onChange={(e) => setservicename(e.target.value)}
            type="text" 
            className="form-control" 
            id="businessname"  
            placeholder="Service Name" />
        </div>
        <div className="form-group">
            <label className="sr-only" for="inlineFormInputGroupTime">Time</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">Time</div>
              </div>
              <input 
              value={servicecost}
              onChange={(e) => setservicecost(e.target.value)}
              type="text" 
              className="form-control" 
              id="inlineFormInputGroupTime" 
              placeholder="Cost" />
            </div>
        </div>
      

     <div id="city-div" className="form-group">
            <label className="sr-only" for="inlineFormInputGroupCost">Cost</label>
            <div className="input-group">
             
              <input 
               value={servicetime}
               onChange={(e) => setservicetime(e.target.value)}
              type="time" 
              className="form-control" 
              id="inlineFormInputGroupUsername" 
              placeholder="Cost" />
            </div>
    </div>
     <div id="city-div" className="form-group">
            <label className="sr-only" for="inlineFormInputGroupCost">Cost</label>
            <div className="input-group">
            
              <input 
               value={weektime_id}
               onChange={(e) => setweektime_id(e.target.value)}
              type="text" 
              className="form-control" 
              id="inlineFormInputGroupUsername" 
              placeholder="Week id" />
            </div>
    </div>
    <div id="city-div" className="form-group">
            <label className="sr-only" for="inlineFormInputGroupCost">Cost</label>
            <div className="input-group">
              
              <input 
               value={business_id}
               onChange={(e) => setbusiness_id(e.target.value)}
              type="text" 
              className="form-control" 
              id="inlineFormInputGroupUsername" 
              placeholder="Business Id" />
            </div>
    </div>

</form>
<input type="submit" value="Submit" className="btn btn-primary" />
<input type="submit" value="Skip" className="btn btn-primary" />

        </div>
    )
}

export default AddService

