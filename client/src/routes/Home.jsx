import React from 'react';
import AddBuisness from '../components/AddBusiness';
import Header from '../components/Header';
import BusinessList from '../components/BusinessList'

const Home = () => {
    return <div>
        <Header />
        <AddBuisness />
        <BusinessList />
    </div>;
};

export default Home;