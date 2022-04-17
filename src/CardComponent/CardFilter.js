import React, { useState } from 'react'
import CardDetails from './CardDetails'
import "./CardFilter.css"
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SortIcon from '@mui/icons-material/Sort';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Carousel from 'react-elastic-carousel';
import { LinearProgress } from '@mui/material';


const CardFilter = ({ parent,loading,searchFil,name,us,pri }) => {


    // const [uniqueCategory, setUniqueCategory] = useState([])


    // useEffect(() => {

    //     let flags = [], uniqueCategories = [], l = parent.length, i;

    //     for (i = 0; i < l; i++) {
    //         if (flags[parent[i].category]) continue;
    //         flags[parent[i].category] = true;
    //         uniqueCategories.push(parent[i]);
    //     }
    //     setUniqueCategory(uniqueCategories)
    // }, [parent])

    console.log(pri);


    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 514, itemsToShow: 2 },
        { width: 850, itemsToShow: 3 }
    ]    
    return (
        <>
        {parent < 1 ? 'No Tickets Here....Yet':
        <Carousel breakPoints={breakPoints}>
        {parent.filter((par)=>{
            if(name.length === 0)            
            {return par} else {
                return par.categoryName === name
            }
        }).map((par,id)=>(
        <div className="card-filter" key={id}>
            <div className="filter-head">
            <div className="filter-head-left">
            <span>{par.categoryName}</span>
            </div>
            <div className="filter-head-mid">
            <SortIcon className="icon-filter"/>
            <FilterAltOutlinedIcon className="icon-filter-2"/>
            </div>
            <MoreVertIcon className="icon-filter-3" />
            </div>
            {par.ticketResponses.filter((pa)=>{
                if(pa.title.toLowerCase().includes(searchFil.term.toLowerCase())){
                    return (pa)
                }
                else if(pa.projectTag.toLowerCase().includes(searchFil.term.toLowerCase())){
                    return (pa)
                }   
                else if(pa.ticketId.toString().toLowerCase().includes(searchFil.term.toLowerCase())){
                    return (pa)
                }   
            }).filter((pa)=>{
                if(us.length === 0)            
                {return pa} else {
                    return pa.status === us
                } 
            }).filter((pa)=>{
                if(pri.length === 0){
                    return pa
                } else {
                    return pa.priority === pri
                }
            }).map((pa,index)=>(
             <CardDetails categoryItem={par.category} pa={pa} key={index} loading={loading}/>
            ))
            }
            {loading ? <LinearProgress/>: ""}
        </div>
        ))}
        </Carousel>
        }
       </> 
    )
}

export default CardFilter
