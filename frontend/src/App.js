import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Search, Ticket, LogOut, Shield, LayoutDashboard } from 'lucide-react';

// Components Import
import Login from './components/Login';
import Register from './components/Register';
import EventDetails from './components/EventDetails';
import Dashboard from './components/Dashboard';
import EventCard from './components/EventCard';
import AdminPanel from './components/AdminPanel';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async() => {
            try {
                setLoading(true);
                const res = await axios.get('http://localhost:5000/api/events');
                const eventData = Array.isArray(res.data) ? res.data : [];
                setEvents(eventData);
                setFilteredEvents(eventData);
            } catch (err) {
                console.error("Fetch Error:", err);
                setEvents([]);
                setFilteredEvents([]);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchTerm(query);
        const filtered = events.filter((ev) => {
            const title = ev.title ? String(ev.title).toLowerCase() : "";
            const location = ev.location ? String(ev.location).toLowerCase() : "";
            return title.includes(query) || location.includes(query);
        });
        setFilteredEvents(filtered);
    };

    return ( <
        div className = "bg-white min-h-screen" > { /* Hero Section */ } <
        div className = "bg-[#2563eb] text-white py-24 px-4 text-center relative" >
        <
        h1 className = "text-6xl font-black mb-6" > Discover Amazing Events < /h1> <
        div className = "max-w-3xl mx-auto relative" >
        <
        div className = "absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" >
        <
        Search size = { 24 }
        /> <
        /div> <
        input type = "text"
        placeholder = "Search events..."
        className = "w-full pl-16 pr-8 py-7 rounded-3xl text-gray-900 text-xl shadow-2xl outline-none"
        value = { searchTerm }
        onChange = { handleSearch }
        /> <
        /div> <
        /div>

        { /* Event Cards Section */ } <
        div className = "max-w-7xl mx-auto px-8 py-20" >
        <
        h2 className = "text-4xl font-black text-gray-900 mb-10" > Upcoming Events < /h2> {
            loading ? ( <
                div className = "grid grid-cols-1 md:grid-cols-3 gap-10" > {
                    [1, 2, 3].map(n => ( <
                        div key = { n }
                        className = "h-96 bg-gray-100 rounded-[2.5rem] animate-pulse" > < /div>
                    ))
                } <
                /div>
            ) : filteredEvents.length > 0 ? ( <
                div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12" > {
                    filteredEvents.map((ev) => ( <
                        EventCard key = { ev.id }
                        event = { ev }
                        />
                    ))
                } <
                /div>
            ) : ( <
                div className = "text-center py-32 bg-gray-50 rounded-[3rem] border-2 border-dashed" >
                <
                p className = "text-2xl font-black text-gray-400" > No events found! < /p> <
                /div>
            )
        } <
        /div> <
        /div>
    );
};

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem("user");
        if (saved) {
            try {
                setUser(JSON.parse(saved));
            } catch (e) {
                console.error("Local Storage Error", e);
            }
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        window.location.href = "/login";
    };

    return ( <
        Router >
        <
        div className = "flex flex-col min-h-screen" >
        <
        nav className = "bg-white border-b p-5 flex justify-between items-center sticky top-0 z-50 px-12 shadow-sm" >
        <
        Link to = "/"
        className = "flex items-center gap-3 font-black text-2xl text-blue-600" >
        <
        Ticket size = { 28 }
        className = "bg-blue-600 text-white p-1 rounded-lg" / >
        <
        span className = "text-gray-900" > EventBook < /span> <
        /Link>

        <
        div className = "flex items-center gap-6" >
        <
        Link to = "/"
        className = "text-gray-500 font-bold hover:text-blue-600" > Browse < /Link>

        {
            user ? ( <
                div className = "flex items-center gap-6" >
                <
                div className = "flex flex-col items-end border-r pr-4 border-gray-200" >
                <
                span className = "text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight" > Welcome < /span> <
                span className = "font-bold text-blue-600 italic" > Hi, { user.name } < /span> <
                /div>

                {
                    (user.role === 'admin' || user.role === 'organizer') && ( <
                        Link to = "/admin"
                        className = "flex items-center gap-2 text-red-600 font-bold bg-red-50 px-3 py-1 rounded-lg hover:bg-red-100 transition-colors" >
                        <
                        Shield size = { 18 }
                        /> Admin Panel <
                        /Link>
                    )
                }

                <
                Link to = "/dashboard"
                className = "flex items-center gap-2 text-gray-700 font-bold hover:text-blue-600" >
                <
                LayoutDashboard size = { 18 }
                /> Dashboard <
                /Link>

                <
                button onClick = { logout }
                className = "text-gray-400 hover:text-red-600 ml-2 p-2 hover:bg-red-50 rounded-full transition-all" >
                <
                LogOut size = { 22 }
                /> <
                /button> <
                /div>
            ) : ( <
                div className = "flex items-center gap-4" >
                <
                Link to = "/login"
                className = "font-bold text-gray-700 hover:text-blue-600" > Login < /Link> <
                Link to = "/register"
                className = "bg-black text-white px-6 py-2 rounded-xl font-bold hover:bg-gray-800 transition-all" > Register < /Link> <
                /div>
            )
        } <
        /div> <
        /nav>

        <
        main className = "flex-grow" >
        <
        Routes >
        <
        Route path = "/"
        element = { < Home / > }
        /> <
        Route path = "/event/:id"
        element = { < EventDetails / > }
        /> <
        Route path = "/login"
        element = { < Login onLogin = {
                (u) => {
                    setUser(u);
                    localStorage.setItem("user", JSON.stringify(u));
                    if (u.role === 'admin' || u.role === 'organizer') {
                        window.location.href = "/admin";
                    } else {
                        window.location.href = "/dashboard";
                    }
                }
            }
            />} / >
            <
            Route path = "/register"
            element = { < Register / > }
            />

            { /* Fix: Added proper Component tags below */ } <
            Route path = "/dashboard"
            element = { user ? < Dashboard / > : < Navigate to = "/login" / > }
            /> <
            Route path = "/admin"
            element = { user && (user.role === 'admin' || user.role === 'organizer') ? < AdminPanel / > : < Navigate to = "/dashboard" / > }
            />

            <
            Route path = "*"
            element = { < Navigate to = "/" / > }
            /> <
            /Routes> <
            /main> <
            /div> <
            /Router>
        );
    }

    export default App;