import React, { useEffect, useState }  from 'react'
// import FilterBar from '../FilterBar/FilterBar'
import MyTickets from '../MyTickets/MyTickets'
import "./MyTicketsView.css"
// import "./FilterBar.css"
import CircleIcon from '@mui/icons-material/Circle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AlarmIcon from '@mui/icons-material/Alarm';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
const MyTicketsView = ({term}) => {
    

    const [filterKeywords,setFilterKeywords] = useState([]);

    const [filterwords,setFilterwords] = useState([]);

    const [isActiveState, setIsActiveState] = useState();

    const [isActivePriorty, setIsActivePriorty] = useState();

    const [stateVisible, setStateVisible] = useState(false);
    const [priorityVisible, setPriorityVisible] = useState(false);

    const [called, setCalled] = useState('Opened');

    useEffect(() => {
        axios.get(`/status`)
        .then(resp => setFilterKeywords(resp.data.data))
        
     },[])


     useEffect(() => {
        axios.get(`/priority`)
        .then(resp => setFilterwords(resp.data.data))  
     },[])

     
     const selectedState = (id, state) => { 
        setCalled(state);
        setIsActiveState(state);
    }

    const removeState = ()=>{
        // props.setStat("");
        // setIsActiveState()
        // setStateVisible(false)
   }

    const removePriority = (id,state)=>{
        // props.setRity("");
        // setIsActivePriorty()
        // setPriorityVisible(false)
   }



    const selectedPriorty = (id, state) => {
        // props.setRity(state)
        // setIsActivePriorty(state);
        // setPriorityVisible(true)

    }

    return (
        <div className="my-ticket-view">
        <div className="my-tickets-filter">
        <div className="filter-bar">
            <div className="filter-left">
                <p>Status</p>
                {
                    filterKeywords.map(stat =>(
                          <span key ={stat.id} className={isActiveState === stat.name? `activeness` : ""} onClick={()=>selectedState(stat.id, stat.name)}>{stat.name}</span>  
                          
                    ))
                }
                {stateVisible ? <span onClick={removeState}>All Statuses</span> : "" }
            </div>
            <div className="filter-mid">
                <p>Priority</p>
                {
                filterwords.map(text =>(
                <span key ={text.id}  className={isActivePriorty === text.name ? `active ${text.name}` : ""} onClick={()=> selectedPriorty(text.id, text.name)}>{text.name}
                    <CircleIcon className={text.name === 'High' && "dot-icon-high" 
                                            || text.name ==='Low' && "dot-icon-low"
                                            || text.name==='Medium' && "dot-icon-med"}/>
                                            </span>))}
                {priorityVisible ? <span onClick={removePriority} className="all-prio">All Priority</span> : " " }
                <span className="filter-span">Due Date<CalendarTodayIcon className="filter-icon"/></span>
                <span className="filter-span">SLA<AlarmIcon className="filter-icon"/></span>
            </div>
            <div className="filter-right">
                <CheckCircleIcon className="filter-icon-right"/>
                <CancelIcon className="filter-icon-right-2"/>
            </div>
        </div>

            {/* <FilterBar/> */}
        </div>
        <div className="my-tickets-display">
            <MyTickets term={term} called={called}/>
        </div>
        </div>

    )
}

export default MyTicketsView
