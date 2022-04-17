import React, { useEffect, useState } from 'react'
import axios from "axios";
import "./CategoriesBar.css"
import { LinearProgress } from '@mui/material';



const CategoriesBar = (props) => {


    const [keywords,setKeywords] = useState([])
    const [isActive, setIsActive] = useState();
    const [visible, setVisible] = useState();



    const fetchedToken = localStorage.getItem('token');

    
    useEffect(() => {
        if (fetchedToken) {
            axios.get(`/category`)
            .then(resp => setKeywords(resp.data.data)).catch(err=> alert(err, 'Try again! Please Refresh the Page'))
        }
        else {
            const reloadCount = sessionStorage.getItem('reloadCount');
            if(reloadCount < 2) {
              sessionStorage.setItem('reloadCount', String(reloadCount + 1));
              window.location.reload();
            } else {
              sessionStorage.removeItem('reloadCount');
            }
        }  
     },[])

          useEffect(() => {
          props.name.length < 1 ? setVisible(false) : setVisible(true)
        }, [props.name])

    
    const filCat = (name,id) => {
        props.setCat(name)
        setIsActive(id)
        setVisible(true)
    }   
    

    const removeCat = ()=>{
        props.setCat("")
        setIsActive()
        setVisible(false);
   }



    return (
        <div className="categories">
            {keywords <  1 ? <LinearProgress/> :
                keywords.map(word =>(
                    <span className={isActive === word.id ? "activeness" : ""} key={word.id} onClick={()=>filCat(word.name,word.id)}>{word.name}</span>
                )) 
            }

            {visible ? <span onClick={removeCat}>All Categories</span> : " " }
            
        </div>
    )
}

export default CategoriesBar
