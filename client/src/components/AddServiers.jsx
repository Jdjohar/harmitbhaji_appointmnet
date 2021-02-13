import React, { useEffect, useState } from "react"
import AddServices from '../apis/AddServices';
import { useHistory } from "react-router-dom";

const AddService = () => {

  let history = useHistory();

  const [servicename, setservicename] = useState("");
  const [servicecost, setservicecost] = useState("");
  const [servicetime, setservicetime] = useState("");
  // const [weektime_id, setweektime_id] = useState("");
  // const [business_id, setbusiness_id] = useState("");


  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try{
     const response = await AddServices.post("/", {
      servicename,
      servicecost,
      servicetime
      });
   history.push(`/dashboard`);
      console.log(response);
    }catch (err) {
  
    }
  
  }






    return (
        <div className="Services">
          <p className="mb-0">Location of your service(s)?</p>

                <div className="custom-control custom-radio custom-control-inline pb-3">
                    <input type="radio" id="customRadioInline1" name="customRadioInline1" className="custom-control-input" />
                    <label className="custom-control-label" for="customRadioInline1">Enterprise</label>
                </div>

                <div class="custom-control custom-radio custom-control-inline py-2">
                        <input type="radio" id="customRadioInline2" name="customRadioInline1" class="custom-control-input" />
                        <label class="custom-control-label" for="customRadioInline2">Home</label>
                </div>

                <h3 className="pt-3">Service 1</h3>


<form action="">
        <div className="form-group col-12">
            <label>Enter in each Service with its cost and duration</label>
            <input 
             value={servicename}
             onChange={(e) => setservicename(e.target.value)}
            type="text" 
            className="form-control" 
            id="businessname"  
            placeholder="Service Name" />
        </div>
        <div className="form-group  col-12">
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
      

     <div id="city-div" className="form-group col-12">
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
     {/* <div id="city-div" className="form-group col-12">
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
    </div> */}
    {/* <div id="city-div" className="form-group col-12">
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
    </div> */}

    <div className="add-new-service">
      <div className>
        <p className="text-center text-primary">Add New Services</p>
      </div>
    </div>

</form>
<div className="col-12 pt-5 text-center">
<input type="submit" value="Submit" onClick={handleSubmit} className="btn btn-outline-primary" />
</div>

        </div>
    )
}

export default AddService

