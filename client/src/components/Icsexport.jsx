import React, { useEffect, useContext } from "react"
import Businessall from '../apis/Businessall'
import { useParams } from "react-router-dom";
import { BusinessContext } from "../context/BusinessContext";

const ICSexport = () => {

    const { id } = useParams();
    const { selectedBusiness, setSelectedBusiness } = useContext(
BusinessContext
    );

    useEffect(() =>{
        const fetchData = async () =>{
            
            try{
                const response = await Businessall.get(`/${id}`);
                console.log(response);
                console.log(response.data.data.business.business_name);
                console.log(response.data.data.time[0].day_name);



                setSelectedBusiness(response.data.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData()
    },[]);

    return (
<div>

    <div>
        {selectedBusiness && (
            <>
            <div className="mt-3">
                <h3>{selectedBusiness.time[0].day_name}</h3>
                <h3>{selectedBusiness.time[0].start_time}</h3>
                <h3>{selectedBusiness.business.business_name}</h3>
                <h3>{selectedBusiness.business.phonenumber}</h3>
                <h3>{selectedBusiness.service[0].servicename}</h3>
            </div>
            </>
        )}
    </div>

</div>

    );
        


}

export default ICSexport;