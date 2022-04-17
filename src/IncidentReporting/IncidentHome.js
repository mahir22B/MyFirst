import React, { useEffect, useState } from 'react'
import "./IncidentHome.css"
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CircleIcon from '@mui/icons-material/Circle';

import IncidentFilter from './IncidentFilter';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { LinearProgress } from '@mui/material';



const IncidentHome = () => {

    const [inciCat, setInciCat] = useState([]);

    useEffect(() => {
        const abortCont = new AbortController();
        // add axios here
          axios.get('/incidentReportCategory',{ signal:abortCont.signal })
          .then(res => setInciCat((res.data.data))
          ).catch(err=>console.log(err))
        return () => abortCont.abort();
      },[])

      const navigate = useNavigate();

  return (
    <div className="incident-home">
    <div className="incident-head">
        <button onClick={() => navigate('/security')} style={{
                    backgroundColor: "#0A387D"  
                }}><p>+</p> Create New Security Incident Report</button>
        <button onClick="" style={{
                    backgroundColor: "#0A387D"  
                }}><p>+</p> Create New Ops/Apps/Programs Incident Report</button>
        <div className="incident-categories">
            {inciCat.length < 1 ? <LinearProgress/>: inciCat.map((cat)=>(
            <span key={cat.id}>{cat.name}</span>
            ))}
        </div>        
    </div>
    <div className="incident-filter">
    <span className="incident-filter-span">Start Date<CalendarTodayIcon className="filter-icon"/></span>
    <span className="incident-filter-span">End Date<CalendarTodayIcon className="filter-icon"/></span>
    <p>
      Status  
    </p>
    <span className="incident-stat">Open</span>
    <span className="incident-stat">Closed</span>
    <p>
        Severity Level
    </p>
    <span className="level-span"><CircleIcon className="dot-icon lw"/>Low</span>
    <span className="level-span"><CircleIcon className="dot-icon md"/>Medium</span>
    <span className="level-span"><CircleIcon className="dot-icon hg"/>High</span>
    <span className="level-span"><CircleIcon className="dot-icon ctc"/>Critical</span>
    <input type="text" placeholder="Search By Title"/>
    </div>

     <div className="incident-fil-par">
     <IncidentFilter/>
     <IncidentFilter/>
     <IncidentFilter/>
     <IncidentFilter/>
     </div>
    </div>  
  )
}

export default IncidentHome