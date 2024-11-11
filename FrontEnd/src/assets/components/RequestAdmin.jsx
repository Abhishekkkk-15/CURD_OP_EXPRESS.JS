import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUserInfo } from '../../app/Slices/loginSlice';
import { useDispatch } from 'react-redux';


function RequestAdmin() {
    // const userInfo = useSelector((state) =>  state.login.userInfo)
    const dispatch = useDispatch()
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false)

    useEffect(()=>{
        (async()=>{
          try {
           const {data} = await axios.post("https://funecommerceserver.onrender.com/CURD/userInfo",{},{withCredentials: true}); //this helps to send cookies to backend server
           dispatch(setUserInfo(data?.userInfo))
          } catch (error) {
            console.log("error",error)
          }
        })();
      },[])

    const userInfo = useSelector((state) => state.login.userInfo) || false;

    const sendingMail = async (e) => {
        e.preventDefault();  // Prevent the form from refreshing the page
        try {
            //In axios we can have first url second is data {must be object}, third is cookies and header sending options
            await axios.post("https://funecommerceserver.onrender.com/CURD/request-admin", {message} , { withCredentials: true });
            alert("Mail Sent"); 
            console.log(message)
            setSent(true)
        } catch (error) {
            alert("Error sending mail");
        }
    };

    if(sent){
        return <h1 className='container'>{"Thanks!! \n Admin will check and give you permission to add your products"}</h1>
    }

    return (
        <div className='container'>
            <form onSubmit={sendingMail}>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">User Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        name="userName"
                        value={userInfo?.userName || "User NAME"}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">User Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleFormControlInput1"
                        name="email"
                        value={userInfo?.email || "User Email"}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Message</label>
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        name="message"
                        rows="3"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    ></textarea>
                </div>
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default RequestAdmin;
