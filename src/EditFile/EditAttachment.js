import React, { useState } from "react";
import { Button, CircularProgress, Input } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import axios from "axios";
import "./EditAttachment.css";

const EditAttachment = ({ onfChange, info }) => {
  const [files, setFiles] = useState([]);
  const [showName, setShowName] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchedToken = localStorage.getItem("token");

  const url = "http://10.1.130.10:88/dev.tms.api/File/AddTicketAttachmentById";

  const OnAddMore = (e) => {
    const allAttach = Array.from(e.target.files).map((file) => file);
    setFiles((prevAtt) => prevAtt.concat(allAttach));
    const fileArray = Array.from(e.target.files).map((file) => file.name);
    setShowName((prevNames) => prevNames.concat(fileArray));
  };

  const rmvAttach = (e) => {
    let x = e.target.getAttribute("delattach");
    setFiles(files.filter((v) => v.name !== x));
    setShowName(showName.filter((art) => art !== x));
  };

  const updateFile = (e) => {
    setLoading(true);
    e.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append("TicketId", info);
    for (let j = 0; j < files.length; j++) {
      let finalFiles = files[j];
      bodyFormData.append("formFiles", finalFiles);
    }

    for (var pair of bodyFormData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    axios.post(url, bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${fetchedToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.succeeded === true) {
          onfChange();
          setLoading(false);
        }
        if (res.data.succeeded === false) {
          setLoading(false);
          alert("There was an error.Pls Try Again");
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <div className="add-attach-file">
        <label>
          <Button className="addfile" variant="contained" component="span">
            Add Files
          </Button>
          <Input
            className="edit-input"
            id="contained-button-file"
            onChange={OnAddMore}
            multiple
            type="file"
          />
        </label>
      </div>
      {showName.length > 0
        ? showName.map((shw, id) => (
            <div className="showAttachFile" key={id}>
              {shw}

              <DeleteOutlineOutlinedIcon
                className="delAttachFile"
                delattach={shw}
                onClick={rmvAttach}
              />
            </div>
          ))
        : " "}

      <div className="all-btn">
        <Button
          className="editFile-save-btn"
          variant="contained"
          onClick={updateFile}
        >
          {loading ? <CircularProgress className="file-progress" /> : "Save"}
        </Button>
        <Button className="editFile-cancel-btn" onClick={onfChange}>
          Cancel
        </Button>
      </div>
    </>
  );
};

export default EditAttachment;
