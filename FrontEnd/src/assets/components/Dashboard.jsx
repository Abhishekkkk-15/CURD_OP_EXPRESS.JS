import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [message, setMessage] = useState('');
    const [update, setUpdate] = useState(false);
    const [show,setShow] = useState()

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}CURD/getAllUsers`, {}, { withCredentials: true });
                setUsers(response.data.user);
                setUserCount(response.data.userCount);
                setProductCount(response.data.productCount);
            } catch (error) {
                console.log("Error fetching dashboard data:", error);
                setMessage('Failed to load dashboard data.');
            }
        })();
    }, [update]);

    useEffect(()=>{
        (async()=>{
          try {
           const {data} = await axios.post(`${import.meta.env.VITE_API_URL}CURD/userInfo`,{},{withCredentials: true}); //this helps to send cookies to backend server
           setShow(data?.isAdmin)
          } catch (error) {
            console.log("error",error)
          }
        })();
      },[])

    const togglePermission = async (userId) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}CURD/grantPermission`,
                { id: userId },
                { withCredentials: true }
            );
            setMessage(response.data.message);
            setUpdate(!update);
        } catch (error) {
            console.log("Error updating permission:", error);
            setMessage('Failed to update permission.');
        }
        setTimeout(() => setMessage(''), 2000); 
    };

    const deleteUser = async (id) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}CURD/deleteUser`, { id }, { withCredentials: true });
            setMessage(response.data.message);
            setUpdate(!update);
        } catch (error) {
            console.log("Error deleting user:", error);
            setMessage('Failed to Delete User');
        }
        setTimeout(() => setMessage(''), 2000); 
    };

    if(!show){
        return <h1 className='text-center mt-5'>You are unauthorized</h1>;
    }

    return (
        <div style={{ padding: '20px', marginTop: '20px' }}>
            {message && (
                <div
                    style={{
                        padding: '10px',
                        color: message.includes('Failed') ? '#ff4d4f' : '#52c41a',
                        border: `1px solid ${message.includes('Failed') ? '#ff4d4f' : '#52c41a'}`,
                        borderRadius: '5px',
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}
                >
                    {message}
                </div>
            )}

            <h2 style={{ marginBottom: '20px' }}>Admin Dashboard</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '5px', flex: 1, marginRight: '10px' }}>
                    <h4>Total Users</h4>
                    <p>{userCount}</p>
                </div>
                <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '5px', flex: 1, marginLeft: '10px' }}>
                    <h4>Total Products</h4>
                    <p>{productCount}</p>
                </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {users.map(user => (
                    user?.email !== "mrabhi748@gmail.com"?<div
                        key={user._id}
                        style={{
                            padding: '20px',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            width: '300px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center'
                        }}
                    >
                        <img
                            src={user.avatar}
                            alt="User Avatar"
                            style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '10px' }}
                        />
                        <h5>{user.userName}</h5>
                        <p>{user.email}</p>
                        <p>
                            <strong>Write Permission:</strong> {user.writePermission ? 'Granted' : 'Revoked'}
                        </p>
                        <button
                            style={{
                                padding: '10px 20px',
                                margin: '10px 0',
                                backgroundColor: user.writePermission ? '#52c41a' : '#ff4d4f',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                            onClick={() => togglePermission(user._id)}
                        >
                            {user.writePermission ? 'Revoke' : 'Grant'} Permission
                        </button>
                        <button
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#ff4d4f',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                            onClick={() => deleteUser(user._id)}
                        >
                            Delete User
                        </button>
                    </div> : ""
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
