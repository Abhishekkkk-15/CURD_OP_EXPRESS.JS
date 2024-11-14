import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [message, setMessage] = useState('');
    const [update, setUpdate] = useState(false);
    const isError = ""
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}CURD/getAllUsers`, 
                    {}, 
                    { withCredentials: true }
                );
                setMessage(response?.data.message)
                setUsers(response.data.user);
                setUserCount(response.data.userCount);
                setProductCount(response.data.productCount);
            } catch (error) {
                setMessage('You are not Authorized');
            }
        };
        fetchData();
    }, [update]);


    const togglePermission = async (userId) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}CURD/grantPermission`, 
                { id: userId }, 
                { withCredentials: true }
            );
            setMessage(response.data.message);
            setUpdate(prev => !prev); 
        } catch (error) {
            setMessage('Failed to update permission.');
        }

        setTimeout(() => setMessage(''), 3000); 
    };

    const deleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}CURD/deleteUser`, 
                { id }, 
                { withCredentials: true }
            );
            setMessage(response.data.message);
            setUpdate(prev => !prev);
        } catch (error) {
            setMessage('Failed to Delete User');
        }

        setTimeout(() => setMessage(''), 3000); 
    };

    if (process.env.NODE_ENV === 'development') {
        console.warn = () => {}; // Suppresses all warnings during development
      }

    return (
        <DashboardContainer>
            {message && <AlertMessage isError={isError}>{message}</AlertMessage>}

            <Heading>Admin Dashboard</Heading>

            <StatsContainer>
                <StatCard title="Total Users" count={userCount} />
                <StatCard title="Total Products" count={productCount} />
            </StatsContainer>

            <UsersContainer>
                {users.filter(user => user?.email !== "mrabhi748@gmail.com").map(user => (
                    <UserCard key={user._id}>
                        <Avatar src={user.avatar} alt="User Avatar" />
                        <UserInfo>
                            <h5>{user.userName}</h5>
                            <p>{user.email}</p>
                            <p><strong>Write Permission:</strong> {user.writePermission ? 'Granted' : 'Revoked'}</p>
                        </UserInfo>
                        <ActionButton
                            isGranted={user.writePermission || false}  
                            onClick={() => togglePermission(user._id)}
                        >
                            {user.writePermission ? 'Revoke' : 'Grant'} Permission
                        </ActionButton>
                        <DeleteButton onClick={() => deleteUser(user._id)}>
                            Delete User
                        </DeleteButton>
                    </UserCard>
                ))}
            </UsersContainer>
        </DashboardContainer>
    );
};

// Styled Components

const DashboardContainer = styled.div`
    padding: 2rem;
`;

const Heading = styled.h2`
    font-size: 2rem;
    margin-bottom: 1.5rem;
`;

const AlertMessage = styled.div`
    padding: 0.75rem;
    background-color: ${props => (props.isError ? '#ffccc7' : '#f6ffed')};
    color: ${props => (props.isError ? '#ff4d4f' : '#52c41a')};
    border: 1px solid ${props => (props.isError ? '#ff4d4f' : '#52c41a')};
    border-radius: 5px;
    margin-bottom: 1.5rem;
    text-align: center;
`;

const StatsContainer = styled.div`
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
`;

const StatCard = ({ title, count }) => (
    <StatCardWrapper>
        <h4>{title}</h4>
        <p>{count}</p>
    </StatCardWrapper>
);

const StatCardWrapper = styled.div`
    flex: 1;
    padding: 1.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    text-align: center;
`;

const UsersContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
`;

const UserCard = styled.div`
    width: 300px;
    padding: 1.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Avatar = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 1rem;
`;

const UserInfo = styled.div`
    margin-bottom: 1.5rem;
`;

const ActionButton = styled.button`
    padding: 0.75rem 1.5rem;
    margin-bottom: 1rem;
    background-color: ${props => (props.isGranted ? '#52c41a' : '#ff4d4f')};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${props => (props.isGranted ? '#45b32b' : '#d93636')};
    }
`;

const DeleteButton = styled(ActionButton)`
    background-color: #ff4d4f;

    &:hover {
        background-color: #d93636;
    }
`;

export default Dashboard;
