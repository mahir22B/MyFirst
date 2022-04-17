import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation, useNavigate } from 'react-router';
import React, { useState } from 'react'
import "./AllTicketsHeader.css"
import ModalUser from '../Modal/ModalUser';


const AllTicketsHeader = (props) => {
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false);

    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const showModal = () => {
        document.getElementById('root-portal').classList.remove('logged-off')
        setIsOpen(!isOpen)
    }

    const getSearchTerm = (e) => {
        props.searchKeyword(e.target.value)
    }
    return (
        <>
        <div className="all-tickets-head">
            <div className="head-left">
                <h3>{location.pathname === "/my" ? "My Tickets": location.pathname==="/knowledge" ? "Knowledge Base": location.pathname===`/Article/${id}` ? "Knowledge Base":location.pathname==="/users"?"Users":location.pathname==="/incident"?"Incident Reporting":"All Tickets" }</h3>
                </div>
                <div className="head-middle">
                    {location.pathname === "/create" ? 

                <button style={{backgroundColor:"grey", cursor:"not-allowed"} } disabled={true} onClick={()=>navigate("/create")}
                 ><p>+</p> Create New Ticket</button>

                : <button onClick={()=>navigate("/create")} style={{
                    backgroundColor: "#0A387D"  
                }}><p>+</p> Create New Ticket</button>}
                </div>
                <div className="head-right">
                <SearchIcon/>
                <input type="text" placeholder="Search..." value={props.term} onChange={getSearchTerm}/>
                <NotificationsIcon/>
                <AccountCircleIcon className = "profile" onClick={showModal}/>
                <ModalUser isOpen={isOpen} onClosing={()=> setIsOpen(false)} />
            </div>
        </div>
        </>
    )
}

export default AllTicketsHeader
