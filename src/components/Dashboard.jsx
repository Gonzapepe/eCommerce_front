import React from 'react';

import { useSelector } from 'react-redux';

const Dashboard = () => {
    const user = useSelector(state => state.userSlice.user);

    return (
      <>
        <h1>Hola <strong>{user.name.toUpperCase()}</strong></h1>    
      </>
    )
}

export default Dashboard;