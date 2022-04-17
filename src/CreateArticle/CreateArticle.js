import { Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import "./CreateArticle.css"
import ReactQuill from "react-quill";
import "../../node_modules/react-quill/dist/quill.snow.css";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";


const CreateArticle = () => {

  const [header, setHeader] = useState('');
  const [body, setBody] = useState('');
  const [fileName, setFileName] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeTitle = (e) => {
    e.preventDefault();
    setHeader(e.target.value)
  }
  const changeDesc = (e) => {
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

  const final = ReactHtmlParser(body);

  console.log(final)

  const remImg = () => {
    setFileName('')
    setPreview(false)
  }

    const navigate = useNavigate();

    let date = new Date().toLocaleString('default', { month: 'long', year:'numeric',day:'numeric' })

    const fetchedToken = localStorage.getItem('token');

    const url = 'http://10.1.130.10:88/dev.tms.api/article'


    const submitForm = (e) => {
      setLoading(true)
      e.preventDefault();
      let bodyFormData = new FormData();
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
            navigate(-1)
            setLoading(false)
        }});
    }

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
     <Button className="back-btn" onClick={()=>navigate(-1)} style={{
                      backgroundColor: "#0A387D"  
                    }}
        variant="contained">Back</Button>
      <div className="create-art-img">
        {!preview ? <>
      <img src="https://i.pinimg.com/236x/ce/7a/bf/ce7abfa050f852d12a6911deed69e72e--rococo.jpg" placeholder="Sample Image"/>
    <label className="art-label">
       Select an Image   
     <input type="file" multiple onChange={onFileChange} className="art-input"/>
    </label></> 
    
    : 
    
    <>
      <img src={fileName} alt="uploaded-img" /> <label className="art-label">
       Change Image   
     <input type="file"  onChange={onFileChange} className="art-input"/>
    </label>
    <button className="art-img-del" onClick={remImg}>Remove Image</button>
    </>
      }
      </div>  
      <p className="art-date-edit">
        {date}
      </p>
      <div className="edit-art-title">
        <p>Header</p>
            <textarea type="text" onChange={changeTitle} value={header}>{header}</textarea>
      </div>
      <div className="edit-art-desc">
        <p>Body</p>
        <ReactQuill modules={modules} formats={formats} onChange={changeDesc} value={body} />
      </div>
      <div className="create-art-controls">
      <Button className="art-save-btn" style={{
                      backgroundColor: "#0A387D"  
                    }}
        variant="contained" onClick={submitForm}>{loading ? <CircularProgress  style={{color:"white"}}/>:"Save"}</Button>
      <Button className="cancel-btn-art" onClick={()=>{navigate(-1)}} style={{
                      backgroundColor: "#707070"  
                    }}
        variant="contained">Cancel</Button>
        </div>
  </div>
  );
};


export default CreateArticle;
