import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import "./Users2.css"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import moment from 'moment'
import { useNavigate } from 'react-router';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import accimg from '../images/accimg.png'
import CancelIcon from "@mui/icons-material/Cancel";
import EditRole from '../EditRole/EditRole';
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";


const Users = ({fetchedRole}) => {

    const [userInfo, setUserInfo] = useState([])
    const [loading,setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    // const [loadNext, setLoadNext] = useState([]);
    // const [numId, setNumId] = useState();

    const [role, setRole] = useState([]);
    const [isEditRole, setIsEditRole] = useState(0);
    


    let offSet = 10; 
    const loadMore = () => {
        let numberPage = 1;
        axios.post('/user/AllEmployees',{
            pageNumber: `${numberPage}`,
            limit: `${offSet}`
          }) 
       .then(res => {setUserInfo((res.data.data));if (res.status===200){
        setLoading(false)
       }}) 
        offSet+=10;  
        numberPage+=1;
    }

    const handleScroll = (e) => {
        if(window.innerHeight + e.target.documentElement.scrollTop + 2 >= e.target.documentElement.scrollHeight){
            setLoading(true)
            loadMore()
        }
    }

    useEffect(() => {
      // add axios here
      loadMore();
      window.addEventListener('scroll', handleScroll)  
    } ,[isEditRole, setUserInfo])
   
    useEffect(() => {
        axios.get('/role')
          .then(req => setRole(req.data.data))
          .catch(err=>console.log(err))
      }, [])

  const handleEdit=(id)=>{
    setIsEditRole(id);
  }

  const fetchedToken = localStorage.getItem('token');

  let roleid;

    const deleterole = (r,empid)=>{ 
        let id  
        if(window.confirm("Are you sure that you wanted to delete that file?"))
    
        {
            console.log(r)
            {
                role.map((ro)=>{
                    if(ro.name===r)
                    id = ro.id
                })
            }
            console.log("id",roleid)
            setUserInfo(userInfo.filter(x=>x.r!== r))
    
           let data = {
    
             "roleId": roleid,
    
             "employeeId":empid
    
           }
           fetch('http://10.1.130.10:88/dev.tms.api/role', {
    
           method: 'DELETE',
           headers: {
    
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${fetchedToken}`
    
           },
    
           body: JSON.stringify(data),
    
         })
    
         .then(response => response.json())
    
         .then(data => {
           console.log('Success:', data);
         })
    
         .catch((error) => {
           console.error('Error:', error);
    
         }); 

         loadMore();
    
        }
        setTimeout(function(){
            window.location.reload(1);
         }, 1000); 
    
    }

    const searchFilter = (e) => {
        setSearchTerm(e.target.value);
    }

    const navigate = useNavigate();

  return (
    <div className="users-all">
        <div className='background-users'>
        <div className="users-head">    
        <h3>All Employees</h3>
        <input placeholder="Search the Employee" onChange={searchFilter}></input>
        </div>
        {userInfo < 1 ? <CircularProgress/> : userInfo.filter((us)=>{
            if(searchTerm==""){
                return us
            } else if(us.name.toLowerCase().includes(searchTerm.toLowerCase())){
                return (us)
            }   
        }).map((us,id)=>(
        <div className="users-accord" key={id}>
        <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className="suggestion">
                    <div className="acc-content">
                     <div className="user-intro">
                        <img className="ac-icon" src={us.profilePath ? us.profilePath : accimg }></img>
                        <div className="user-text">
                        <span>{us.name}</span>
                        <p>{us.position}</p>
                       
                    
                       
                        {/* <div className='change-role'  >
                            <h6>Role</h6>
                            <span key={id} onClick={()=> handleEdit(us.id)}>Edit</span>
                        </div>

                             {isEditRole === us.id ? <EditRole onRoleChange={handleEdit} id={us.id}/> :
                             <>{us.roles.map((rol,id)=>(
                                 <div className="delete-role">
                                <p key={id}>{rol}</p>
                                <DeleteOutlineOutlinedIcon className='deleterole-icon' type='button' onClick={()=>deleterole(rol,us.id)}/>
                                </div>
                            ))
                            }</>
                            } */}

{
                               fetchedRole[0]==="Super Admin" || fetchedRole[1]==="Super Admin" || fetchedRole[2]==="Super Admin" ? 
                               <>
                                <div className='change-role'  >
                                    <h6>Role</h6>
                                    <span key={id} onClick={()=> handleEdit(us.id)}>Edit</span>
                                </div>
                                {isEditRole === us.id ? <EditRole onRoleChange={handleEdit} id={us.id}/> :
                             <>{us.roles.map((rol,id)=>(
                                 <div className="delete-role">
                                {rol==="Super Admin" ? <p key={id}>{rol}</p> :
                                <>
                                <p key={id}>{rol}</p>
                                <DeleteOutlineOutlinedIcon className='deleterole-icon' type='button' onClick={()=>deleterole(rol,us.id)}/>
                                </>
                                }
                                </div>
                            ))
                            }</>
                            }
                               </> 
                               : 
                               <>
                               <div className='user-role'  >
                                    {us.roles.map((rol,id)=>(
                                        <span key={id}>{rol}</span>
                                    ))}
                                </div>
                               </>
                            } 
                        
                        
                        </div>
                    
                       
                        
                     </div>
                     <div className="user-cont-details">
                         <p>{us.email ? us.email : "No Email"}</p>
                         <p>{us.phoneNumber ? us.phoneNumber : "No Phone Number"}</p>
                     </div>
                     <div className="user-cat">
                         {us.categoryName.map((cat,id)=>(
                         <span key={id}>{cat}</span>
                         ))}
                     </div>
                     <div className="user-tick-count">
                         <div className="total-tick-user">
                            <p>Total Tickets<span>{us.totalTickets}</span></p>
                          </div>
                          <div className="indi-count">
                         <div className="indi-tick-user-new">  
                            <p>New<span>{us.opened}</span></p>
                          </div>
                          <div className="indi-tick-user-in">  
                            <p>Inprogress<span>{us.inProgress}</span></p>
                           </div>
                           <div className="indi-tick-user-close"> 
                            <p>Closed<span>{us.closed}</span></p>
                          </div> 
                          </div>
                      </div>       
                    </div>
                </Typography>
              </AccordionSummary>
              
              <AccordionDetails>
                <Typography>
                    <div className="def-tickets">    
                 {us.ticketList.map((tic)=>(
                <div className="card-details-duplicate" key={tic.ticketId} onClick={() => navigate(`/open/${tic.ticketId}`)}>
            <div className= {tic.priority === 'High' && "card-det-duplic card red" || tic.priority==='Low' && "card-det-duplic card yellow" || tic.priority==='Medium' && "card-det-duplic card green"}>
            <div className="card-top">
                <span>{tic.ticketId}</span>
                <OpenInNewIcon className="icon-new" style={{color:"#3169bd"}}/>
            </div>
            <p className="card-para">{tic.title}</p>
            <div className="card-mid">
                <span>
                    Status
                    <p className="status-para">
                    {tic.status}
                    </p>
                </span>
                <span>
                    Project
                    <p>
                    {tic.projectTag}
                    </p>
                </span>
                <span>
                    Category
                    <p>
                    {tic.category}
                    </p>
                </span> 
            </div>
            <div className="card-bottom">
                <span>
                    Created Date
                    <p>
                    {moment(tic.submittedDate).format('L - h:mm')}
                    </p>
                </span>
                <span>
                    Due Date
                    <p>
                    {moment(tic.dueDate).format('L')}
                    </p>
                </span> 
            </div>
        </div>
        </div>
                 ))}      
                 </div>
                 {/* <div className="load-more">
                 <div className="def-tickets">    
                 {loadNext.map((ld)=>(
                <div className="card-details-duplicate" key={ld.ticketId} onClick={() => navigate(`/open/${ld.ticketId}`)}>
            <div className= {ld.priority === 'High' && "card-det-duplic card red" || ld.priority==='Low' && "card-det-duplic card yellow" || ld.priority==='Medium' && "card-det-duplic card green"}>
            <div className="card-top">
                <span>{ld.ticketId}</span>
                <OpenInNewIcon style={{color:"#3169bd"}}/>
            </div>
            <p className="card-para">{ld.title}</p>
            <div className="card-mid">
                <span>
                    Status
                    <p className="status-para">
                    {ld.status}
                    </p>
                </span>
                <span>
                    Project
                    <p>
                    {ld.projectTag}
                    </p>
                </span>
                <span>
                    Category
                    <p>
                    {ld.category}
                    </p>
                </span> 
            </div>
            <div className="card-bottom">
                <span>
                    Created Date
                    <p>
                    {moment(ld.submittedDate).format('L - h:mm')}
                    </p>
                </span>
                <span>
                    Due Date
                    <p>
                    {moment(ld.dueDate).format('L')}
                    </p>
                </span> 
            </div>
        </div>
        </div>
                 ))}      
                 </div>
                 </div>
                 <button onClick={()=>setNumId(us.id);loadNew()}>Load Next</button> */}
                </Typography>
              </AccordionDetails>
            </Accordion>
            </div>
        ))}    
            </div>
    </div>
  )
}

export default Users