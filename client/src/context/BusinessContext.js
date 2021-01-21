import React, {useState, createContext} from 'react';

export const BusinessContext = createContext();

export const BusinessContextProvider = props => {
    const [business, setBusiness] = useState([]);
    const [selectedBusiness, setSelectedBusiness] = useState(null);

    const addBuisness1 = (business1) => {
        setBusiness([...business,business1]);
    };

    return(
        <BusinessContext.Provider 
        value={{business, 
                setBusiness, 
                addBuisness1,
                selectedBusiness,
                setSelectedBusiness,
                }}
                >
               {props.children}
        </BusinessContext.Provider>
    );
};
