import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MenuItem, Button, Select } from '@mui/material'
import "./EditList.css"

const EditList = ({info,onStChange}) => {

    const [assign, setAssign] = useState([])
    const [assignId, setAssignId] = useState(0)

    const [ticketId, setTicketId] = useState([])


    useEffect(() => {
      const abortCont = new AbortController();
      // add axios here
      axios.get(`/ticket/${info}`,{ signal:abortCont.signal })
      .then(res => setTicketId((res.data.data))
      ).catch(err=>console.log(err))
      return () => abortCont.abort();
    },[info])


    useEffect(() => {
        const abortCont = new AbortController();
        // add axios here
        axios.get(`/assign`,{ signal:abortCont.signal })
        .then(res => setAssign((res.data.data))
        ).catch(err=>console.log(err))
        return () => abortCont.abort();
      },[])

      const inputEvent = (event) => {
        setAssignId(event.target.value)    
       }; 

       let data = JSON.stringify({
        "ticketId":info,
        "assignId":assignId === 0 ? ticketId.assignId : assignId,
      });
      
      const fetchedToken = localStorage.getItem('token');
    
      let config = {
    
        method: 'post',
      
        url: 'http://10.1.130.10:88/dev.tms.api/ticket/UpdateTicketAssign',
      
        headers: { 
      
          'Content-Type': 'application/json', 
      
          'Authorization': `Bearer ${fetchedToken}`
      
        }, 
        data : data
      };


      const saveDetails = () => {
          console.log(data)

          axios(config).then(function(response) {
            
          console.log(JSON.stringify(response.data));
            
          })
          onStChange();
          
      }


  return (
      <>
    <div className="edit">
         <Select className="sel_category-2"
            displayempty
            name="assign"
            value={assignId}
            onChange={inputEvent}
          >
            <MenuItem value="0" disabled>Add Assignee</MenuItem>
            {assign.map((cat, id) => (
              <MenuItem key={id} value={cat.id}>{cat.fullName}</MenuItem>
            ))
            }
          </Select>

    </div>
    <div className="btn-asg">
        <Button className="edit-save" onClick={saveDetails}>Save</Button>
        <Button className="edit-cancel" onClick={onStChange}>Cancel</Button>
      </div>   
    </>
  )
}
export default EditList;