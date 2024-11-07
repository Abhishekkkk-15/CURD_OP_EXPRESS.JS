import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


function PlaceOrder() {
    const navigate = useNavigate();
    const logOrNot = useSelector((state) => state.login.logOrNot);
    console.log(logOrNot)

    const handleBuyNow = () => {
        if (logOrNot) {
            alert('Proceeding to payment...');
            navigate('/checkout');
        } else {
            alert('Please login first!');
            navigate('/login');
        }
    };

    return (
        <div className='container text-center mt-5'>
            {logOrNot ? (
                <>
                    <h1>Buy Now</h1>
                    <button className='btn btn-primary mt-3' onClick={handleBuyNow}>Proceed</button>
                </>
            ) : (
                <h1>
                    <Link to="/login" className='mt-5 text-center'>Login first</Link>
                </h1>
            )}
        </div>
    );
}

export default PlaceOrder;
