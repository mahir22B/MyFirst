import { Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './EditModal.css';
import CloseIcon from '@mui/icons-material/Close';
import LinearProgress from '@mui/material/LinearProgress';


const EditModal = ({onProfileEdit,user}) => {

       
    const[loading,setLoading] = useState(false) 
    const [fileName, setFileName] = useState([]);
    const [imgFiles, setImgFiles] = useState([]);
    const [preview, setPreview] = useState(false);
    
    

      const onFileChange = (e) => {
        // const allAttach = Array.from(e.target.files).map((file)=>file)
        setImgFiles(e.target.files[0]);
        
        if(e.target.files && e.target.files[0]){
          let reader = new FileReader()
    
          reader.onload = function(e){
            setFileName(e.target.result)
            setPreview(true)
          }
          reader.readAsDataURL(e.target.files[0])
        }
      }

      const remImg = () => {
        setFileName('')
        setPreview(false)
      }


    const fetchedToken = localStorage.getItem('token');

    const url = 'http://10.1.130.10:88/dev.tms.api/user/UploadProfilePicture'


    const EditedForm = (e) => {
      setLoading(true)
      e.preventDefault();
      let bodyFormData = new FormData();
     
      bodyFormData.append('formFile', imgFiles);
    for (var pair of bodyFormData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
      axios.post(url, bodyFormData,
        {
          headers:
            { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${fetchedToken}` }
        }).then(res=>{console.log(res) 
          if (res.data.succeeded === true){
            onProfileEdit();
            setLoading(false)
        }if(res.data.succeeded===false){
          setLoading(false);
          alert("There was an error.Pls Try Again")
          
        }}).catch(err=>alert(err));
    }
    

  return (
   <>
     {!preview ? <>
      <img src={user.profilePath ? user.profilePath : <AccountCircleIcon />} placeholder="Sample Image"/>
    <label className="mdl-label">
       Select an Image   
     <input type="file" multiple onChange={onFileChange} className="mdl-input"/>
    </label></> 
    
    : 
    
    <>
      <img src={fileName ? fileName : <AccountCircleIcon />} alt="uploaded-img" />
     <button onClick={remImg} className="img-del" >
              <CloseIcon className="img-close"/>
      </button>
    </>
      }
      
     
     <div className='button-class'>
     <Button className="save-btn" style={{
                     backgroundColor: "#0A387D"  
                   }}
       variant="contained" onClick={EditedForm}>{loading?<CircularProgress className='loader-class' />:"Save"}</Button>
     <Button className="cancel-btn" onClick={onProfileEdit} style={{
                     backgroundColor: "#707070"  
                   }}
       variant="contained">Cancel</Button>
       </div>
  
 </>
  );

};

export default EditModal;