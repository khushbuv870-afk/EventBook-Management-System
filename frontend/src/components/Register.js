import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "user" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError("");
        try {
            // Localhost (5000) par backend call
            const res = await axios.post('http://localhost:5000/api/register', formData);

            // Logic Fix: Backend 'success: true' bhej raha hai
            if (res.data && (res.data.success === true || res.data.status === "Success")) {
                alert("Registration Successful! Now Login.");
                navigate('/login');
            } else {
                setError("Registration failed. Please try again.");
            }
        } catch (err) {
            // Error handling ko aur majboot kiya gaya hai
            let errorMsg = "Server error or connection failed.";
            if (err.response && err.response.data && err.response.data.error) {
                errorMsg = err.response.data.error; // Backend validation error dikhane ke liye
            } else if (err.response && err.response.data && err.response.data.message) {
                errorMsg = err.response.data.message;
            }
            setError(errorMsg);
            console.error("Registration Error Details:", err);
        }
    };

    return ( <
        div className = "min-h-screen flex items-center justify-center bg-gray-100" >
        <
        div className = "max-w-md w-full bg-white p-10 rounded-3xl shadow-lg" >
        <
        h2 className = "text-3xl font-bold text-center mb-6" > Create Account < /h2> 

        {
            error && ( <
                div className = "bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center border border-red-200" > { error } <
                /div>
            )
        }

        <
        form onSubmit = { handleSubmit }
        className = "space-y-5" >
        <
        input type = "text"
        placeholder = "Full Name"
        required className = "w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-gray-200"
        onChange = {
            (e) => setFormData({...formData, name: e.target.value }) }
        />

        <
        input type = "email"
        placeholder = "Email Address"
        required className = "w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-gray-200"
        onChange = {
            (e) => setFormData({...formData, email: e.target.value }) }
        />

        <
        input type = "password"
        placeholder = "Password"
        required className = "w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-gray-200"
        onChange = {
            (e) => setFormData({...formData, password: e.target.value }) }
        />

        <
        select className = "w-full p-4 border rounded-2xl outline-none bg-white font-medium"
        value = { formData.role }
        onChange = {
            (e) => setFormData({...formData, role: e.target.value }) } >
        <
        option value = "user" > User < /option>  <
        option value = "organizer" > Organizer < /option>  <
        option value = "admin" > Admin < /option>  <
        /select>

        <
        button type = "submit"
        className = "w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition shadow-lg" >
        Sign Up <
        /button>  <
        /form> 

        <
        p className = "mt-6 text-center text-sm" >
        Already have an account ? < Link to = "/login"
        className = "text-blue-600 font-bold ml-1" > Login < /Link>  <
        /p>  <
        /div>  <
        /div>
    );
};

export default Register;