import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const Login = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        role: 'user'
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError("");
        try {
            // Backend call with email, password, and role
            const res = await axios.post('http://localhost:5000/api/login', credentials);

            if (res.data.success || res.data.status === "Success") {
                // User details local storage mein save kar rahe hain
                localStorage.setItem("user", JSON.stringify(res.data.user));
                onLogin(res.data.user);

                // ✅ UPDATED REDIRECT LOGIC: 
                // Admin aur Organizer dono ko Admin Panel bhejna hai
                const userRole = res.data.user.role;
                if (userRole === 'admin' || userRole === 'organizer') {
                    navigate('/admin');
                } else {
                    navigate('/'); // Normal user home page par jayega
                }
            } else {
                setError("Login failed. Please try again.");
            }
        } catch (err) {
            let msg = "Invalid credentials. Check email, password and role.";
            if (err.response && err.response.data && err.response.data.message) {
                msg = err.response.data.message;
            } else if (err.message === "Network Error") {
                msg = "Server is not running. Please start your backend.";
            }
            setError(msg);
        }
    };

    return ( <
        div className = "min-h-screen bg-[#f8faff] flex flex-col items-center justify-center p-4" > { /* Logo Section */ } <
        div className = "text-center mb-8" >
        <
        div className = "bg-white p-3 rounded-xl shadow-sm inline-block mb-3" >
        <
        Calendar className = "text-blue-600"
        size = { 40 }
        strokeWidth = { 2.5 }
        /> <
        /div> <
        h1 className = "text-3xl font-bold text-gray-800" > EventBook < /h1> <
        p className = "text-gray-500" > Book and manage events with ease < /p> <
        /div>

        <
        div className = "max-w-md w-full bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden" > { /* Toggle Bar */ } <
        div className = "flex p-2 bg-gray-50 m-6 rounded-2xl" >
        <
        button className = "flex-1 py-3 bg-white rounded-xl shadow-sm font-bold text-gray-800" > Login < /button> <
        Link to = "/register"
        className = "flex-1 py-3 text-center text-gray-500 font-medium" > Register < /Link> <
        /div>

        <
        div className = "px-8 pb-10" >
        <
        div className = "mb-6" >
        <
        h2 className = "text-xl font-bold text-gray-800" > Welcome Back < /h2> <
        p className = "text-gray-400 text-sm" > Login to your account to
        continue < /p> <
        /div>

        {
            error && ( <
                p className = "text-red-500 text-xs font-bold mb-4 bg-red-50 p-2 rounded-lg text-center border border-red-100" > { error } < /p>
            )
        }

        <
        form onSubmit = { handleSubmit }
        className = "space-y-5" >
        <
        div >
        <
        label className = "block text-sm font-bold text-gray-700 mb-2" > Email < /label> <
        input type = "email"
        name = "email"
        placeholder = "you@example.com"
        className = "w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 font-medium"
        onChange = { handleChange }
        required /
        >
        <
        /div>

        <
        div >
        <
        label className = "block text-sm font-bold text-gray-700 mb-2" > Password < /label> <
        input type = "password"
        name = "password"
        placeholder = "••••••••"
        className = "w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 font-medium"
        onChange = { handleChange }
        required /
        >
        <
        /div>

        <
        div >
        <
        label className = "block text-sm font-bold text-gray-700 mb-2" > Login As < /label> <
        select name = "role"
        value = { credentials.role }
        onChange = { handleChange }
        className = "w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-gray-600" >
        <
        option value = "user" > User < /option> <
        option value = "organizer" > Organizer < /option> <
        option value = "admin" > Admin < /option> <
        /select> <
        /div>

        <
        button type = "submit"
        className = "w-full bg-[#0a0a0a] hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg" >
        Login <
        /button> <
        /form>

        <
        div className = "mt-8 p-5 bg-blue-50 rounded-2xl border border-blue-100" >
        <
        h3 className = "text-xs font-bold text-blue-600 uppercase tracking-wider mb-3" > Demo Accounts: < /h3> <
        div className = "space-y-2 text-[11px] text-blue-800 font-medium" >
        <
        p > < span className = "font-bold" > Admin: < /span> admin@eventbook.com /
        admin123 < /p> <
        p > < span className = "font-bold" > Organizer: < /span> organizer@eventbook.com /
        org123 < /p> <
        p > < span className = "font-bold" > User: < /span> user@eventbook.com /
        user123 < /p> <
        /div> <
        /div> <
        /div> <
        /div> <
        /div>
    );
};

export default Login;