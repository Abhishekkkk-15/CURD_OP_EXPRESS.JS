import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [reg, setReg] = useState({});
    const [userRegi, setuserRegi] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setReg((prev) => ({
            ...prev,
            [name]: name === 'avatar' ? files[0] : value, 
        }));
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("avatar", reg.avatar);
        formData.append("userName", reg.userName);
        formData.append("email", reg.email);
        formData.append("password", reg.password);

        try {
            // Vercel Rotue
            const response = await axios.post("https://funecommerceserver.onrender.com/CURD/reg", formData, {
                headers: { "Content-Type": "multipart/form-data" } 
            });
            // const response = await axios.post("http://localhost:8000/CURD/reg", formData, {
            //     headers: { "Content-Type": "multipart/form-data" }  
            // });
            setuserRegi(response?.data);
            if(response?.data == "User Regitred"){
            setTimeout(()=>{
                navigate('/login')
            },3000)}

        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <div className="container w-100 p-3 align-middle bg-g">
    {userRegi && (
        <div className="alert alert-success d-flex align-items-center mb-4 p-2" role="alert">
            <i className="bi bi-check-circle-fill me-2"></i>
            <label className="col-form-label fw-bold" style={{ fontSize: '1.1em' }}>{userRegi}</label>
        </div>
    )}

    <form onSubmit={handleRegister}>
        <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Profile Img</label>
            <div className="col-sm-5">
                <input
                    type="file"
                    className="form-control"
                    name="avatar"
                    onChange={handleChange}
                />
            </div>
        </div>
        <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">UserName</label>
            <div className="col-sm-5">
                <input
                    type="text"
                    className="form-control"
                    name="userName"
                    onChange={handleChange}
                />
            </div>
        </div>
        <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-5">
                <input
                    type="text"
                    className="form-control"
                    name="email"
                    onChange={handleChange}
                />
            </div>
        </div>
        <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-5">
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={handleChange}
                />
            </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block">
            Register
        </button>
    </form>
    <p className="mt-5">
        <Link to="/login" className="mt-3">Already have an account?</Link>
    </p>
</div>

    );
}

export default Register;
