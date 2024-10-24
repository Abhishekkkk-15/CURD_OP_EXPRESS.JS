import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function PlaceOrder({ login }) {
    const navigate = useNavigate();

    const handleBuyNow = () => {
        if (login) {
            // Code for processing the order (e.g., navigate to a payment page)
            alert('Proceeding to payment...');
            navigate('/checkout'); // Replace with the correct route
        } else {
            // Redirect to login if not logged in
            alert('Please login first!');
            navigate('/login');
        }
    };

    return (
        <div className='container text-center mt-5'>
            {login ? (
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
