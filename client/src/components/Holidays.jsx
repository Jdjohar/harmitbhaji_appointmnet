import React, { useEffect, useState } from "react"
import Holiday from '../apis/Holiday';
import { useHistory } from "react-router-dom";

const Holidays = () => {

  let history = useHistory();

  const [business_id, setbusiness_id] = useState("");
  const [holidaydate, setholidaydate] = useState("");
  const [holidaymonth, setholidaymonth] = useState("");
  const [holidayname, setholidayname] = useState("");


  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try{
     const response = await Holiday.post("/", {
        business_id,
        holidaydate,
        holidaymonth,
        holidayname,
      });
   history.push(`/business/${id}/holiday`);
      console.log(response);
    }catch (err) {
  
    }
  
  }

    return (
        <div className="Services">
<form action="">
<div className="form-group">
            <label>Business Id</label>
            <input 
             value={business_id}
             onChange={(e) => setbusiness_id(e.target.value)}
            type="text" 
            className="form-control" 
            id="businessname"  
            placeholder="UserName" />
        </div>
        <div className="form-group">
            <label>Date</label>
            <select 
            value={holidaydate}
            className="form-control" 
            onChange={(e) => setholidaydate(e.target.value)}
            >
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
            </select>
        </div>
        <div className="form-group">
            <label>Month</label>
            <select 
              value={holidaymonth}
            className="form-control" 
            onChange={(e) => setholidaymonth(e.target.value)}
            >
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
            </select>
        </div>
        <div className="form-group">
            <label>Holiday Name</label>
            <input 
             value={holidayname}
             onChange={(e) => setholidayname(e.target.value)}
            type="text" 
            className="form-control" 
            id="businessname"  
            placeholder="UserName" />
        </div>
      

</form>
<input type="submit" value="Submit"  onClick={handleSubmit} className="btn btn-primary" />

        </div>
    )
}

export default Holidays

