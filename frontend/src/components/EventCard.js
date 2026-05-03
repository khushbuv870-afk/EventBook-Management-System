import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        // MySQL mein column ka naam 'id' hai ya 'event_id', dono ko handle kiya hai
        const eventId = event.id || event.event_id;

        if (eventId) {
            navigate(`/event/${eventId}`);
        } else {
            console.error("Event ID missing!", event);
            alert("Error: Event details available nahi hain.");
        }
    };

    return ( <
        div className = "bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col h-full hover:-translate-y-2" >

        { /* Image Section */ } <
        div className = "relative overflow-hidden aspect-[16/10]" >
        <
        img src = { event.image_url || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800" }
        alt = { event.title }
        className = "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /
        >
        <
        div className = "absolute top-5 right-5" >
        <
        span className = "bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-800 shadow-xl border border-gray-100" > { event.category || 'Event' } <
        /span> <
        /div> <
        /div>

        { /* Content Section */ } <
        div className = "p-8 flex flex-col flex-grow" >
        <
        div className = "space-y-3 mb-6" >
        <
        h3 className = "text-2xl font-black text-gray-900 leading-tight tracking-tight group-hover:text-blue-600 transition-colors" > { event.title } <
        /h3> <
        p className = "text-gray-500 text-sm font-medium line-clamp-2 leading-relaxed" > { event.description } <
        /p> <
        /div>

        { /* Details Grid */ } <
        div className = "space-y-4 pt-2 mb-8" >
        <
        div className = "flex items-center gap-3 text-blue-600 font-bold text-[13px] bg-blue-50/50 p-2 rounded-lg w-fit" >
        <
        Calendar size = { 16 }
        strokeWidth = { 2.5 }
        /> <
        span > { String(event.date_time) } < /span> <
        /div>

        <
        div className = "flex items-center gap-3 text-gray-600 font-bold text-[13px]" >
        <
        MapPin size = { 16 }
        strokeWidth = { 2.5 }
        className = "text-red-500" / >
        <
        span > { event.location } < /span> <
        /div>

        <
        div className = "flex items-center justify-between border-t border-gray-50 pt-4 mt-auto" >
        <
        div className = "flex items-center gap-2 text-gray-400 font-bold text-[12px]" >
        <
        Users size = { 16 }
        strokeWidth = { 2.5 }
        /> <
        span > { event.available_seats || '0' }
        Seats Left < /span> <
        /div> <
        div className = "flex flex-col items-end" >
        <
        span className = "text-[10px] font-black text-gray-400 uppercase" > Price < /span> <
        span className = "text-2xl font-black text-gray-900" > ₹{ event.price } < /span> <
        /div> <
        /div> <
        /div>

        { /* Action Button */ } <
        button onClick = { handleNavigate }
        className = "w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-blue-600 hover:shadow-[0_10px_20px_rgba(37,99,235,0.3)] transition-all active:scale-95" >
        View Details <
        /button> <
        /div> <
        /div>
    );
};

export default EventCard;