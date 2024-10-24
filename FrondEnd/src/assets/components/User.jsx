import React from 'react';

function UserInfo() {
    return (
        <div className="card text-center mt-5">
            <div className="card-header">
                User Information
            </div>
            <div className="card-body">
                <h5 className="card-title">Username: </h5>
                <p className="card-text">Email:</p>
            </div>
            <div className="card-footer text-muted">
                Thank you for visiting!
            </div>
        </div>
    );
}

export default UserInfo;
