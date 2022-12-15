import React from 'react';
import {useSelector} from 'react-redux';
import {selectEmail} from '../../redux/slice/authSlice';

const AdminOnlyroute = ({children}) => {
    const userEmail = useSelector(selectEmail);
    console.log(userEmail);

    // userEmail will be added to .env file later
    if(userEmail === "goodnessigunma@gmail.com"){
        return children
    }
    return null
};

export default AdminOnlyroute;