import React from 'react'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SortIcon from '@mui/icons-material/Sort';
import IncidentDetails from './IncidentDetails';
import './IncidentFilter.css'

const IncidentFilter = () => {
  return (
      
    <div className="incident-tix">
     <div className="filter-head"> 
        <div className="filter-head-left">
        <span>IT Ops</span>
        </div>
        <div className="filter-head-mid">
        <SortIcon className="icon-filter"/>
        <FilterAltOutlinedIcon className="icon-filter-2"/>
        </div>
        </div>
        <IncidentDetails/>
        <IncidentDetails/>
        <IncidentDetails/>
        <IncidentDetails/>
    </div>
     
  )
}

export default IncidentFilter