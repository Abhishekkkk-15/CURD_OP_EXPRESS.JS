import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PlaceOrder = () => {
    const navigate = useNavigate();
    const logOrNot = useSelector((state) => state.login.logOrNot);

    const handleBuyNow = () => {
        if (logOrNot) {
            // Proceed to payment flow
            alert('Proceeding to payment...');
        } else {
            alert('Please login first!');
            navigate('/login');
        }
    };

    return (
        <Container>
            {logOrNot ? (
                <>
                    <Title>Buy Now</Title>
                    <ProceedButton onClick={handleBuyNow}>Proceed</ProceedButton>
                </>
            ) : (
                <LoginPrompt>
                    Please{' '}
                    <StyledLink to="/login">login first</StyledLink> to proceed.
                </LoginPrompt>
            )}
        </Container>
    );
};

// Styled Components

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 2rem;
`;

const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: 1rem;
`;

const ProceedButton = styled.button`
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const LoginPrompt = styled.h1`
    font-size: 1.25rem;
    color: #333;
`;

const StyledLink = styled(Link)`
    color: #007bff;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

export default PlaceOrder;
