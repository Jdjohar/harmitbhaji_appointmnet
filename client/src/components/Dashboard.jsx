import React, { useState } from "react";
import ReactDOM from "react-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { columns, data } from "./data";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from "@syncfusion/ej2-react-schedule";

const Dashboard = ({localizer }) => {


  const [value, onChange] = useState(new Date());



  const tableData = {
    columns,
    data
  };

    return <div >

      <div className="row">
      <div className="col-md-9 float-left">
        <div className="p-4">
        <ScheduleComponent>
    <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
  </ScheduleComponent>
        </div>
    </div>
    
    <div className="col-md-3  float-left">
    <Calendar
        onChange={onChange}
        value={value}
      />
  
    </div>

      </div>








      <div className="col-md-12">
<div className="main">


      <DataTableExtensions {...tableData}>
        <DataTable
          columns={columns}
          data={data}
          noHeader
          defaultSortField="id"
          defaultSortAsc={false}
          pagination
          highlightOnHover
        />
      </DataTableExtensions>
    </div>
    </div>


    </div>;
};
const rootElement = document.getElementById("root");
ReactDOM.render(<Dashboard />, rootElement);

export default Dashboard;
