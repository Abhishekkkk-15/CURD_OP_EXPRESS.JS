import React from 'react';
import { useDispatch } from 'react-redux';

function Logout() {
    return (
        <div className="text-center mt-5">
            <button className="btn btn-danger" >
                Logout
            </button>
        </div>
    );
}

export default Logout;
