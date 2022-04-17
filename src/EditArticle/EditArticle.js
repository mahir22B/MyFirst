import { Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import "./EditArticle.css"
import moment from 'moment'
import axios from 'axios';
import big from '../images/big.png'
import ReactQuill from 'react-quill';
import "../../node_modules/react-quill/dist/quill.snow.css";



const EditArticle = ({onEditChange,currentArticle,id}) => {

    const [header, setHeader] = useState(currentArticle.title);
    const [body, setBody] = useState(currentArticle.description);   
    const[loading,setLoading] = useState(false) 
    const [fileName, setFileName] = useState([]);
    const [imgFiles, setImgFiles] = useState([]);
    const [preview, setPreview] = useState(false);
    
    const editTitle = (e) => {
        e.preventDefault();
        setHeader(e.target.value)

      }
      const editDesc = (e) => {
        // e.preventDefault();
        setBody(e)
      }

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

    const url = 'http://10.1.130.10:88/dev.tms.api/article/UpdateArticle'


    const EditedForm = (e) => {
      setLoading(true)
      e.preventDefault();
      let bodyFormData = new FormData();
      bodyFormData.append('Id',id);
      bodyFormData.append('Title', header);
      bodyFormData.append('Description', body);
      bodyFormData.append('file', imgFiles);
    for (var pair of bodyFormData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
      axios.post(url, bodyFormData,
        {
          headers:
            { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${fetchedToken}` }
        }).then(res=>{console.log(res) 
          if (res.data.succeeded === true){
            onEditChange();
            setLoading(false)
        }if(res.data.succeeded===false){
          setLoading(false);
          alert("There was an error.Pls Try Again")
          // window.location.reload();
        }}).catch(err=>alert(err));
    }
    // console.log(currentArticle)

    const modules = {
      toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean'],
      ],clipboard: {matchVisual: false,}
    }
    
    const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image'
    ]

  return (
    <div className="create-art">
    <Button className="back-btn" onClick={onEditChange} style={{
                     backgroundColor: "#0A387D"  
                   }}
       variant="contained">Back</Button>
     <div className="create-art-img">
     {!preview ? <>
      <img src={big} placeholder="Sample Image"/>
    <label className="art-label">
       Select an Image   
     <input type="file" multiple onChange={onFileChange} className="art-input"/>
    </label></> 
    
    : 
    
    <>
      <img src={fileName ? fileName : big} alt="uploaded-img" /> <label className="art-label">
       Change Image   
     <input type="file"  onChange={onFileChange} className="art-input"/>
    </label>
    <button className="art-img-del" onClick={remImg}>Remove Image</button>
    </>
      }
     </div>  
     <p className="art-date-edit">
     {moment(currentArticle.createdDate).format('MMMM Do YYYY')}
     </p>
     <div className="edit-art-title">
       <p>Header</p>
           <textarea type="text" value={header} onChange={editTitle}></textarea>
     </div>
     <div className="edit-art-desc">
       <p>Body</p>
       <ReactQuill type="text"  value={body} onChange={editDesc} />
     </div>
     <div className="create-art-controls">
     <Button className="save-back-btn" style={{
                     backgroundColor: "#0A387D"  
                   }}
       variant="contained" onClick={EditedForm}>{loading?<CircularProgress style={{color:"white"}} />:"Save"}</Button>
     <Button className="cancel-btn-art" onClick={onEditChange} style={{
                     backgroundColor: "#707070"  
                   }}
       variant="contained">Cancel</Button>
       </div>
 </div>
  );
};

export default EditArticle;
