import React, { useEffect, useState } from 'react'
import CategoriesBar from '../CategoriesBar/CategoriesBar';
import FilterBar from '../FilterBar/FilterBar';
import "./ContentArea.css"
import CardRender from '../CardComponent/CardRender';
import axios from 'axios';

const ContentArea = (props) => {

    const [parent, setParent] = useState([])
    const [loading, setLoading] = useState(true)
    const [fdata, setFdata] = useState([])
    const [name, setName] = useState('');
    const [us, setUs] = useState('');
    const [pri, setPri] = useState('');

    const setCat = (name) => {
        setName(name);
    }

    const setStat = (us) => {
        setUs(us)
    }

    const setRity = (pri) => {
        setPri(pri)
    }

    console.log(us);

    
    
    let offSet = 10; 
    const loadMore = () => {
        let numberPage = 1;
        axios.post('/ticket/GetApplicableTickets',{
            pageNumber: `${numberPage}`,
            limit: `${offSet}`
        }) 
        .then(res => {setParent((res.data.data));if (res.status===200){
            setLoading(false)
       }}) 
       offSet+=10;  
       numberPage+=1;

    }

    const handleScroll = (e) => {
        if(window.innerHeight + e.target.documentElement.scrollTop + 2 >= e.target.documentElement.scrollHeight){
            setLoading(true)
            loadMore();
        }
    }
    
    useEffect(() => {
        // add axios here
      loadMore();
      window.addEventListener('scroll', handleScroll)  
    } ,[])
    
    const [state,setState] = useState('');
    const [data, setData] = useState(parent)
    
    
    useEffect(()=>{setData(parent)},[parent])
    
    useEffect(()=> {
        setFdata(data);
    }, [data]);
         
                
    return (
        <>
            <div className="content-area">
            <CategoriesBar setCat={setCat} name={name}/>
            <FilterBar us={us} setStat={setStat} pri={pri} setRity = {setRity}/>
            <CardRender parent={fdata} searchFil = {props} loading={loading} name={name} us={us} pri={pri}/>
            </div>
        </>  
    )
}

export default ContentArea;
