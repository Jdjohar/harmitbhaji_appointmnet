import React, { useState } from "react"
import WeekTime from '../apis/WeekTime'
import { useHistory } from "react-router-dom";
   
const AddTime = () => {
    let history = useHistory();

    const [business_id, setbusiness_id] = useState("");
    const [start_time, setstart_time] = useState("");
    const [end_time, setend_time] = useState("");
    const [day_name, setday_name] = useState("");

    const handleSubmit = async (e, id) => {
        e.preventDefault();
        
        try{
            const response = await WeekTime.post("/", {
                business_id,
                start_time,
                end_time

            });
            history.push(`/business/${id}/services`);
    console.log(response);
            

        } catch (err) {

        }
    }
    return (
        <div className="addTime">

        <div className="row">
        <div className="col">
                        <small for="from">Business id </small>
                        <input 
                            value={business_id}
                            onChange={(e) => setbusiness_id(e.target.value)}
                            type="text" 
                            className="form-control" 
                            placeholder="Start Time" 
                        />
                    </div>

                 
                    <div className="col">
                        <small for="from">From </small>
                        <input 
                            value={start_time}
                            onChange={(e) => setstart_time(e.target.value)}
                            type="time" 
                            className="form-control" 
                            placeholder="Start Time" 
                        />
                    </div>
                    <div className="col">
                        <small for="from">To </small>
                        <input 
                            value={end_time}
                            onChange={(e) => setend_time(e.target.value)}
                            type="time" 
                            className="form-control" 
                            placeholder="End Time" 
                        />
                    </div>
                    <div className="col">
                        <small for="from">Day name </small>
                        <input 
                            value={day_name}
                            onChange={(e) => setday_name(e.target.value)}
                            type="text" 
                            className="form-control" 
                            placeholder="Day name" 
                        />
                    </div>
        </div>

        <div className="form-check">
                    <input className="form-check-input" type="radio"  name="exampleRadios" id="exampleRadios1" value="option1" checked />
                    <label className="form-check-label" for="exampleRadios1">
                        Application to all days operating
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio"  name="exampleRadios" id="exampleRadios2" value="option2" />
                    <label className="form-check-label" for="exampleRadios2">
                        Customize time per day
                    </label>
                </div>

                <form>
                        <div className="form-group d-none" id="Province-div">
                            <label>Select all days operating<span className="text-danger">*</span></label>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="mon-tab" data-toggle="tab" href="#mon" role="tab" aria-controls="mon" aria-selected="true">Mon</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="tue-tab" data-toggle="tab" href="#tue" role="tab" aria-controls="tue" aria-selected="false">Tue</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="wed-tab" data-toggle="tab" href="#wed" role="tab" aria-controls="wed" aria-selected="false">Wed</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="thur-tab" data-toggle="tab" href="#thur" role="tab" aria-controls="thur" aria-selected="false">Thur</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="fri-tab" data-toggle="tab" href="#fri" role="tab" aria-controls="fri" aria-selected="false">Fri</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="sat-tab" data-toggle="tab" href="#sat" role="tab" aria-controls="sat" aria-selected="false">Sat</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="sun-tab" data-toggle="tab" href="#sun" role="tab" aria-controls="sun" aria-selected="false">Sun</a>
                                </li>
                            </ul>

                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="mon" role="tabpanel" aria-labelledby="mon-tab">
                                    <label for="exampleInputPassword1">Time Operating <span className="text-danger">*</span></label>
                                    <div className="row">
                                        <div className="col">
                                            <small for="from">From </small>
                                            <input type="time" className="form-control" placeholder="First name" />
                                        </div>
                                        <div className="col">
                                            <small for="from">To </small>
                                            <input type="time" className="form-control" placeholder="Last name" />
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="tue" role="tabpanel" aria-labelledby="tue-tab">
                                    <label for="exampleInputPassword1">Time Operating</label>

                                    <div className="row">
                                        <div className="col">
                                            <small for="from">From </small>
                                            <input type="time" className="form-control" placeholder="First name" />
                                        </div>
                                        <div className="col">
                                            <small for="from">To </small>
                                            <input type="time" className="form-control" placeholder="Last name" />
                                        </div>
                                    </div>
                                    
                                  
                                   
                                </div>
                                <div className="tab-pane fade" id="wed" role="tabpanel" aria-labelledby="wed-tab">
                                    <label for="exampleInputPassword1">Time Operating</label>
                                    <div className="row">
                                        <div className="col">
                                            <input type="time" className="form-control" placeholder="First name" />
                                        </div>
                                        <div className="col">
                                            <input type="time" className="form-control" placeholder="Last name" />
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade show" id="thur" role="tabpanel" aria-labelledby="thur-tab">
                                    <label for="exampleInputPassword1">Time Operating</label>

                                    <div className="row">
                                        <div className="col">
                                            <input type="time" className="form-control" placeholder="First name" />
                                        </div>
                                        <div className="col">
                                            <input type="time" className="form-control" placeholder="Last name" />
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="fri" role="tabpanel" aria-labelledby="fri-tab">
                                    <label for="exampleInputPassword1">Time Operating</label>
                                    <div className="row">
                                        <div className="col">
                                            <input type="time" className="form-control" placeholder="First name" />
                                        </div>
                                        <div className="col">
                                            <input type="time" className="form-control" placeholder="Last name" />
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="sat" role="tabpanel" aria-labelledby="sat-tab">
                                    <label for="exampleInputPassword1">Time Operating</label>
                                    <div className="row">
                                        <div className="col">
                                            <input type="time" className="form-control" placeholder="First name" />
                                        </div>
                                        <div className="col">
                                            <input type="time" className="form-control" placeholder="Last name" />
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="sun" role="tabpanel" aria-labelledby="sun-tab">
                                    <label for="exampleInputPassword1">Time Operating</label>
                                    <div className="row">
                                        <div className="col">
                                            <input type="time" className="form-control" placeholder="First name" />
                                        </div>
                                        <div className="col">
                                            <input type="time" className="form-control" placeholder="Last name" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
{/* 
                        <button type="submit" className="btn btn-primary">Next</button>  */}
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary">Next</button>
                    </form>                   

        </div>
        

    )
}

export default AddTime;
