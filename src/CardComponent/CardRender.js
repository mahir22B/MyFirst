import React from 'react'
import CardFilter from './CardFilter'
import "./CardRender.css"

const CardRender = ({parent,loading,searchFil,name,us,pri}) => {

    // const [items, setItems] = useState([])

    // const fetchedToken = localStorage.getItem('token');

   
    // useEffect(() => {

    //     const abortCont = new AbortController();
    //     // add axios here
    //     if (fetchedToken){
    //         axios.get('/ticket',{ signal:abortCont.signal })
    //        .then(res => setItems((res.data.data)))
    //     }
    //     return () => abortCont.abort();
    // },[])

    return (
        <div className="card-render">
            <CardFilter parent={parent} loading={loading} searchFil={searchFil} name={name} us={us} pri={pri}/>
        </div>
    )
}

export default CardRender;
