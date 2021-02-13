import React from 'react'
import AddTime from '../components/AddTime';

const AddTiming = () => {
    return <div>
        <div class="progress w-25 offset-md-4">
  <div class="progress-bar"  role="progressbar" style={{width: "55%"}} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100">55%</div>
</div>
<h3 className="text-center py-3">Calendar</h3>
<hr />
    <div className="col-md-6 float-left">
        <div className="p-4">
            <AddTime />
        </div>
    </div>
    <div className="col-md-6 float-left">
            <div className="img-section p-4">
                <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8YnVzaW5lc3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80" className="img-fluid"/>
            </div>
        </div>
    </div>;
};

export default AddTiming;     