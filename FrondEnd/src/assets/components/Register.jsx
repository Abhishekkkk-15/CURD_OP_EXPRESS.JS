import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
    const [reg, setReg] = useState({});
    const [userRegi, setuserRegi] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setReg((prev) => ({
            ...prev,
            [name]: name === 'avatar' ? files[0] : value, // Handling file input separately
        }));
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("avatar", reg.avatar); // Append the avatar file
        formData.append("userName", reg.userName);
        formData.append("email", reg.email);
        formData.append("password", reg.password);

        try {
            const response = await axios.post("http://localhost:8000/CURD/reg", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setuserRegi(response?.data);

        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <div className='container w-100 p-3 align-middle bg-g'>
            {userRegi && <label className="col-sm-2 col-form-label">{userRegi}</label>}

            <form onSubmit={handleRegister}>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Profile Img</label>
                    <div className="col-sm-5">
                        <input
                            type="file"
                            className="form-control-plaintext"
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
                            className="form-control-plaintext"
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
                            className="form-control-plaintext"
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
                <button type='submit' className='btn btn-primary btn-block'>
                    Register
                </button>
            </form>
            <p className='mt-5'>
                <Link to={"/login"} className='mt-3'>Already have an account?</Link>
            </p>
        </div>
    );
}

export default Register;
