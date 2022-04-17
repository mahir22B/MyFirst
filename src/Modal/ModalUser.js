import React, { useEffect, useState } from 'react';
import  ReactDOM  from 'react-dom';
import "./ModalUser.css"
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Button } from '@mui/material';
import EditModal from '../EditModal/EditModal';


const ModalUser = ({isOpen, onClosing}) => {

  const [user, setUser] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const[edit, setEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const abortCont = new AbortController();
    // add axios here
    axios.get(`/user`,{ signal:abortCont.signal })
    .then(res => setUser((res.data.data)))
    .catch(err=>console.log(err))
    return () => abortCont.abort();
  },[edit])

  
   
  const signOutLogic = () => {
    localStorage.removeItem("token");
    // localStorage.removeItem("refresh");
    sessionStorage.removeItem('reloadCount');
    navigate("/")
    document.getElementById('root-portal').classList.add('logged-off')
    window.location.reload()
  }

  
  if(!isOpen) return null

  const editModal=()=>{
    setEdit(!edit)
  }



  return ReactDOM.createPortal( 
  <div className="modal-container">
    <div className="modal-top">
    <span className="profile-span">Profile</span>
    <p onClick={onClosing} ><CloseIcon/></p>
    </div>
    <div className="class-padding">
    <div className="modal-content">
    {edit ? <EditModal user={user}  onProfileEdit={editModal} />:<>
    <img src={user.profilePath ? user.profilePath : ""} placeholder="Sample Image" className="account-icon" />
      <Button className='btn-modal' style={{
                      backgroundColor: "#0A387D"
            }} variant="contained" onClick={editModal}>Edit</Button>
</>}
      </div>
      <div className="content-right">
          <span>{user.fullName}</span>
          <p>{user.department}</p>
          <p>{user.email}</p>
          <p>{user.phoneNumber}</p>
      </div>
    </div>
    <div>
      <button className="out-sign" variant = "contained" onClick={signOutLogic}>Sign Out</button>
    </div>

  </div>,
  document.getElementById('root-portal')
  )
};

export default ModalUser;
