import React, { useEffect, useState, useRef } from "react";
// import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import "./MyTickets.css";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ProgressBar from "@ramonak/react-progress-bar";
import ArticleIcon from "@mui/icons-material/Article";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditRow from "../EditRow/EditRow";
import NextResParty from "../NextResParty/NextResParty";
import moment from "moment";
import axios from "axios";
import FileSaver from "file-saver";
import { CircularProgress, Switch } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ChangeStatus from "../Status/ChangeStatus";
import { MentionsInput, Mention } from "react-mentions";
import { LinearProgress } from "@mui/material";
import EditList from "../EditListAssign/EditList";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Add } from '@material-ui/icons';
import accimg from "../images/accimg.png";
import EditAttachment from "../EditFile/EditAttachment";

const MyTickets = ({ term, called }) => {
  const [inputData, setInputData] = useState("");
  const [text, settext] = useState([]);
  const [ticketCount, setTicketCount] = useState([]);
  const [ticketNumber, setTicketNumber] = useState([]);
  const [selectTicket, setSelectTicket] = useState([]);
  const [savedComments, setSavedComments] = useState([]);
  const [ticketAttachments, setTicketAttachments] = useState([]);

  const [responsible, setResponsible] = useState([]);

  const [open, setOpen] = useState(false);

  const [showParty, setShowParty] = useState(false);

  const [showStatus, setShowStatus] = useState(false);

  const [showIgn, setShowIgn] = useState(false);

  const [sugg, setSugg] = useState([]);

  const [showFile, setShowFile] = useState(false);

  const textChange = (e) => {
    setInputData(e.target.value.split("@@@^^^").join(" "));
  };

  // const [timerDay, setTimerDay] = useState()
  // const [timerHour, setTimerHour] = useState()
  // const [timerMin, setTimerMin] = useState()
  // const [timerSec, setTimerSec] = useState()
  const [loading, setLoading] = useState(false);
  const [loadNew, setLoadNew] = useState(false);

  // useEffect(()=>{
  //   const abortCont = new AbortController();
  //   setTimeout(()=>{
  //     axios.get(`/ticket/GetByUserId`,{ signal:abortCont.signal })
  //     .then(res => setTicketCount((res.data.data)))
  //     .catch(err=>console.log(err))
  //   },800)
  //   return () => abortCont.abort();
  // },[open,showParty,showStatus])

  let offSet = 10;
  const loadMore = () => {
    let numberPage = 1;
    axios
      .post("/ticket/GetTicketsBasedOnUserAndStatus", {
        pageNumber: `${numberPage}`,
        limit: `${offSet}`,
        status: `${called}`,
      })
      .then((res) => {
        setTicketCount(res.data.data);
        if (res.status === 200) {
          setLoadNew(false);
        }
      });
    offSet += 10;
    // numberPage+=1;
  };

  const handleScroll = (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      setLoadNew(true);
      loadMore();
    }
  };

  setTimeout(() => {
    setLoadNew(false);
  }, 2000);

  useEffect(() => {
    // add axios here
    loadMore();
    window.addEventListener("scroll", handleScroll);
  }, [open, showParty, showStatus, called]);

  useEffect(() => {
    const abortCont = new AbortController();
    setTimeout(() => {
      axios
        .get(`/ticket/${ticketNumber}`, { signal: abortCont.signal })
        .then((response) => setSelectTicket(response.data.data))
        .catch((err) => console.log(err));
    }, 800);
    return () => abortCont.abort();
  }, [ticketNumber, open, showParty, showStatus]);

  useEffect(() => {
    const abortCont = new AbortController();
    setTimeout(() => {
      axios
        .get(`/ticket/${ticketNumber}`, { signal: abortCont.signal })
        .then((resp) => setSavedComments(resp.data.data.comments))
        .catch((err) => console.log(err));
    }, 800);
    return () => abortCont.abort();
  }, [ticketNumber, text]);

  useEffect(() => {
    const abortCont = new AbortController();
    // add axios here
    axios
      .get(`/ticket/${ticketNumber}`, { signal: abortCont.signal })
      .then((res) => setTicketAttachments(res.data.data.attachments))
      .catch((err) => console.log(err));
    return () => abortCont.abort();
  }, [ticketNumber, showFile]);

  useEffect(() => {
    const abortCont = new AbortController();
    // add axios here
    setTimeout(() => {
      axios
        .get(`/nextResponsible/${ticketNumber}`, { signal: abortCont.signal })
        .then((res) => setResponsible(res.data.data))
        .catch((err) => console.log(err));
    }, 800);
    return () => abortCont.abort();
  }, [ticketNumber, showIgn]);

  useEffect(() => {
    const abortCont = new AbortController();
    axios
      .get("/user/EmployeeList", { signal: abortCont.signal })
      .then((res) => setSugg(res.data.data))
      .catch((err) => console.log(err));
    return () => abortCont.abort();
  }, []);

  const [showAct, setShowAct] = useState(false);

  const [dispTab, setDispTab] = useState([]);

  useEffect(() => {
    const abortCont = new AbortController();
    // add axios here
    setTimeout(() => {
      axios
        .get(`/activity/${ticketNumber}`, { signal: abortCont.signal })
        .then((res) => setDispTab(res.data.data))
        .catch((err) => console.log(err));
    }, 800);
    return () => abortCont.abort();
  }, [ticketNumber, open, showParty, showStatus]);

  const onShowClick = () => {
    setShowAct(true);
  };

  const onComClick = () => {
    setShowAct(false);
  };

  const addComment = () => {
    if (!inputData) {
    } else {
      axios(config).then(function (response) {
        console.log(JSON.stringify(response.data));
      });
      settext([...text, inputData]);
      setInputData("");
    }
  };

  let data = JSON.stringify({
    ticketId: ticketNumber,
    comments: inputData,
  });

  const fetchedToken = localStorage.getItem("token");

  let config = {
    method: "post",

    url: "http://10.1.130.10:88/dev.tms.api/Comments",

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${fetchedToken}`,
    },
    data: data,
  };

  // let interval;
  // const dateDue = selectTicket ? selectTicket.dueDate : 10

  // const startTimer = () => {
  //   const finalDue =  (new Date(dateDue).getTime());

  //   interval = setInterval(()=>{
  //    const finalSub =  (new Date().getTime());
  //    const distance = finalDue - finalSub === NaN ? 0 : finalDue - finalSub

  //    const days = Math.floor((distance)/(24 * 60 * 60 * 1000))
  //    const hours = Math.floor((distance % (24 * 60 * 60 * 1000))/(1000 * 60 * 60));
  //    const minutes = Math.floor((distance % (60 * 60 * 1000))/(1000 * 60));
  //    const seconds = Math.floor((distance % ( 60 * 1000))/(1000));

  //    setTimerDay(days)
  //    setTimerHour(hours)
  //    setTimerMin(minutes)
  //    setTimerSec(seconds)

  //   })

  // }

  // useEffect(() => {
  //   const abortCont = new AbortController();
  //  return (startTimer(),
  //   { signal:abortCont.signal })
  //   // return () => abortCont.abort();
  // });

  const editTicket = () => {
    setOpen(!open);
  };

  const editParty = () => {
    setShowParty(!showParty);
  };

  const editStat = () => {
    setShowStatus(!showStatus);
  };

  const editIgn = () => {
    setShowIgn(!showIgn);
  };

  const editFile = () => {
    setShowFile(!showFile);
  };

  const downloadFile = (filename) => {
    {
      let data = {
        ticketId: `${ticketNumber}`,
        fileName: filename,
      };

      fetch("http://10.1.130.10:88/dev.tms.api/File/Attachment", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${fetchedToken}`,
        },

        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          FileSaver.saveAs(response.data.filePath, response.data.fileName);
        })

        .catch((error) => {
          console.log(error);
        });
    }
  };

  const deletefile = (fileName) => {
    if (window.confirm("Are you sure that you wanted to delete that file?")) {
      let data = {
        ticketId: `${ticketNumber}`,

        fileName: fileName,
      };
      fetch("http://10.1.130.10:88/dev.tms.api/File/Delete", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${fetchedToken}`,
        },

        body: JSON.stringify(data),
      })
        .then((response) => response.json())

        .then((data) => {
          console.log("Success:", data);
          setTicketAttachments(
            ticketAttachments.filter((x) => x.fileName !== fileName)
          );
          //  ticketAttachments.splice(0,1);
          //  setTicketAttachments(ticketAttachments);
        })

        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const [checked, setChecked] = useState(false);
  const [nxtTix, setNxtTix] = useState([]);

    let setOff = 5; 
    const loadNext = () => {     
        let numberPage = 1;
        axios.post('/ticket/GetAssignedTicketsBasedOnStatus',{
            pageNumber: `${numberPage}`,
            limit: `${setOff}`,
            status:`${called}`
          }) 
       .then(res => {setNxtTix((res.data.data));
        if (res.status === 200){
        setLoadNew(false)
        }}) 
        setOff+=5;  
    }

  const OnSwitchChange = (e) => {
    setChecked(e.target.checked);
    // {!checked ? notifyRes() : notifyMy()}
    console.log(e.target.checked);
  };

  // let setOff = 5;
  // const loadNext = () => {
  //   let numberPage = 1;
  //   axios
  //     .post("/ticket/GetAssignedTicketsBasedOnStatus", {
  //       pageNumber: `${numberPage}`,
  //       limit: `${setOff}`,
  //       status: `${called}`,
  //     })
  //     .then((res) => {
  //       setNxtTix(res.data.data);
  //       if (res.status === 200) {
  //         setLoadNew(false);
  //       }
  //     });
  //   setOff += 5;
  // };

  // console.log(called);

  const scrollHandle = (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      setLoadNew(true);
      loadNext();
    }
  };

  setTimeout(() => {
    setLoadNew(false);
  }, 2000);

  useEffect(() => {
    // add axios here
    loadNext();
    window.addEventListener("scroll", scrollHandle);
  }, [open, showParty, showStatus, called]);

  // const inputFile = useRef(null);

  // const addAttach = (e) => {
  //   inputFile.current.click();
  //   };

  return (
    <div className="ticket-parent">
      <div className="tickets-list">
        <div className="left-div">
          <div className="top-ticket">
            <p>Created Tickets</p>
            <div>
              <Switch onChange={OnSwitchChange} checked={checked} />
            </div>
            <p>Assigned Tickets</p>
          </div>
          {!checked ? (
            <>
              {!ticketCount
                ? "Sorry you don't have any tickets"
                : ticketCount &&
                  ticketCount
                    .filter((tix) => {
                      if (
                        tix.title.toLowerCase().includes(term.toLowerCase())
                      ) {
                        return tix;
                      } else if (
                        tix.projectTag
                          .toLowerCase()
                          .includes(term.toLowerCase())
                      ) {
                        return tix;
                      } else if (
                        tix.ticketId
                          .toString()
                          .toLowerCase()
                          .includes(term.toLowerCase())
                      ) {
                        return tix;
                      }
                    })
                    .map((tix, index) => (
                      <div
                        className={
                          (tix.priority === "High" && "single-list red") ||
                          (tix.priority === "Low" && "single-list yellow") ||
                          (tix.priority === "Medium" && "single-list green")
                        }
                        key={index}
                        onClick={() => {
                          setTicketNumber(tix.ticketId);
                          setLoading(true);
                          window.scrollTo(0, 0);
                        }}
                      >
                        <div className="single-list-title" key={index}>
                          <p>ID {tix.ticketId}</p>
                          <OpenInNewIcon
                            className="icon-new"
                            style={{ color: "#3169bd" }}
                          />
                        </div>
                        <div className="single-list-desc">{tix.title}</div>
                        <div className="single-list-details">
                          <div className="single-list-stat">
                            <p>Status</p>
                            <span>{tix.status}</span>
                          </div>
                          <div className="single-list-rest">
                            <p>Project</p>
                            <span>{tix.projectTag}</span>
                          </div>
                          <div className="single-list-rest">
                            <p>Category</p>
                            <span>{tix.category}</span>
                          </div>
                          <div className="single-list-rest due">
                            <p>Due Date</p>
                            <span>{moment(tix.dueDate).format("L")}</span>
                          </div>
                        </div>
                        <div className="single-list-created">
                          <p>
                            Created on{" "}
                            {moment(tix.submittedDate).format("L - h:mm  a")}
                          </p>
                        </div>
                      </div>
                    ))}{" "}
            </>
          ) : (
            <>
              {" "}
              {!nxtTix
                ? "Sorry you don't have any tickets"
                : nxtTix &&
                  nxtTix
                    .filter((nxts) => {
                      if (
                        nxts.title.toLowerCase().includes(term.toLowerCase())
                      ) {
                        return nxts;
                      } else if (
                        nxts.projectTag
                          .toLowerCase()
                          .includes(term.toLowerCase())
                      ) {
                        return nxts;
                      } else if (
                        nxts.ticketId
                          .toString()
                          .toLowerCase()
                          .includes(term.toLowerCase())
                      ) {
                        return nxts;
                      }
                    })
                    .map((nxts, index) => (
                      <div
                        className={
                          (nxts.priority === "High" && "single-list red") ||
                          (nxts.priority === "Low" && "single-list yellow") ||
                          (nxts.priority === "Medium" && "single-list green")
                        }
                        key={index}
                        onClick={() => {
                          setTicketNumber(nxts.ticketId);
                          setLoading(true);
                          window.scrollTo(0, 0);
                        }}
                      >
                        <div className="single-list-title" key={index}>
                          <p>ID {nxts.ticketId}</p>
                          <OpenInNewIcon
                            className="icon-new"
                            style={{ color: "#3169bd" }}
                          />
                        </div>
                        <div className="single-list-desc">{nxts.title}</div>
                        <div className="single-list-details">
                          <div className="single-list-stat">
                            <p>Status</p>
                            <span>{nxts.status}</span>
                          </div>
                          <div className="single-list-rest">
                            <p>Project</p>
                            <span>{nxts.projectTag}</span>
                          </div>
                          <div className="single-list-rest">
                            <p>Category</p>
                            <span>{nxts.category}</span>
                          </div>
                          <div className="single-list-rest due">
                            <p>Due Date</p>
                            <span>{moment(nxts.dueDate).format("L")}</span>
                          </div>
                        </div>
                        <div className="single-list-created">
                          <p>
                            Created on{" "}
                            {moment(nxts.submittedDate).format("L - h:mm  a")}
                          </p>
                        </div>
                      </div>
                    ))}
            </>
          )}
          {loadNew ? <LinearProgress /> : ""}
        </div>
      </div>

      {!selectTicket.ticketId ? (
        <div className="noId">
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <p>Nothing Here!!</p>
              <p>Please Select a Ticket to view details</p>
              <ReceiptLongIcon className="noId-icon" />
            </>
          )}
        </div>
      ) : (
        <div className="my-ticket-area-duplicate">
          <div className="div-left-duplicate">
            <span className="my-span">ID - {selectTicket.ticketId}</span>
            <span className="my-span-2">{selectTicket.title}</span>
            <div className="my-ticket-description-duplicate">
              {selectTicket.description}
            </div>
            <div className="my-tickets-head">
              <span
                className={
                  showAct
                    ? "my-tickets-comments-head"
                    : "my-tickets-comments-head little"
                }
                onClick={onComClick}
              >
                COMMENTS
              </span>

              <span
                className={
                  showAct
                    ? "my-tickets-comments-act little"
                    : "my-tickets-comments-act"
                }
                onClick={onShowClick}
              >
                ACTIVITY
              </span>
            </div>
            {!showAct ? (
              <div className="user-input-section-duplicate">
                <MentionsInput
                  className="mentions--multiLine"
                  placeholder="Enter Comments"
                  value={inputData}
                  onChange={textChange}
                >
                  <Mention
                    trigger="@"
                    data={sugg}
                    markup="__display__@@@^^^"
                    className="mention-dis"
                  />
                </MentionsInput>
                <button onClick={addComment}>Save</button>

                {savedComments &&
                  savedComments
                    .map((tixd, num) => (
                      <div className="comments-display" key={num}>
                        <div className="comment-head">
                          <img
                            src={tixd.profilePath ? tixd.profilePath : accimg}
                            className="img-pro"
                          />
                          <p className="title-comment">{tixd.fullName}</p>
                          <p className="title-note">added a comment - </p>
                          <p className="title-time">
                            {moment(tixd.createdDate).format("L - h:mm a ")}
                          </p>
                        </div>
                        <div className="comment-content">{tixd.comments}</div>
                      </div>
                    ))
                    .sort()
                    .reverse()}
              </div>
            ) : (
              <>
                <div className="user-input-section-duplicate">
                  {dispTab.length < 1
                    ? "No Activity Yet"
                    : dispTab.map((disp, id) => (
                        <div className="table-body" key={id}>
                          <span>
                            Title <p>{disp.title}</p>
                          </span>
                          <span>
                            Status <p>{disp.status}</p>
                          </span>
                          <span>
                            Category <p>{disp.category}</p>
                          </span>
                          <span>
                            Client <p>{disp.client}</p>
                          </span>
                          <span>
                            Next Responsible <p>{disp.nextResponsible}</p>
                          </span>
                          <span>
                            Project <p>{disp.project}</p>
                          </span>
                          <span>
                            Priority <p>{disp.priority}</p>
                          </span>
                          <span>
                            Created Date{" "}
                            <p>{moment(disp.createdDate).format("L - h:mm")}</p>
                          </span>
                        </div>
                      ))}
                </div>
              </>
            )}
          </div>

          <div className="div-center-duplicate">
            <div className="status-progress">
              <h1>Status</h1>
              <span className="edit-span" onClick={editStat}>
                {showStatus ? <CancelIcon /> : "Edit"}
              </span>
            </div>
            {showStatus ? (
              <ChangeStatus onStatChange={editStat} info={ticketNumber} />
            ) : (
              <span
                className={
                  (selectTicket.status === "Opened" && "stat-open") ||
                  (selectTicket.status === "Closed" && "stat-close") ||
                  (selectTicket.status === "In-Progress" && "stat-progress") ||
                  (selectTicket.status === "Work Completed" && "stat-work")
                }
              >
                {selectTicket.status}
              </span>
            )}

            <ProgressBar completed={25} completedClassName="my-progress-bar" />
            <div className="add-attach">
              <h1>Attachment</h1>
              <span className="icon-attach" onClick={editFile}>
                {showFile ? <CancelIcon /> : "+"}
              </span>
              {/* <input
            type="file"
            id="file"
            ref={inputFile}
            style={{ display: "none" }}
         /> */}
              {/* <Add onClick={addAttach} className="icon-attach"/> */}
            </div>
            {showFile ? (
              <EditAttachment onfChange={editFile} info={ticketNumber} />
            ) : (
              <>
                {ticketAttachments < 1 ? (
                  <p class="empty-attach">None</p>
                ) : (
                  ticketAttachments &&
                  ticketAttachments.map((attach, id) => (
                    <>
                      <div className="single-attachment" key={id}>
                        <div className="attach-text">
                          <ArticleIcon className="attachment-icon" />
                          <div className="attachment-text">
                            <p>{attach.fileName}</p>
                            <p>{attach.size}</p>
                          </div>
                        </div>
                        <div className="attach-con">
                          <FileDownloadOutlinedIcon
                            className="file-attach-icon"
                            type="button"
                            onClick={() => {
                              downloadFile(attach.fileName);
                            }}
                          >
                            Download
                          </FileDownloadOutlinedIcon>
                          <DeleteOutlineOutlinedIcon
                            className="delete-icon"
                            type="button"
                            onClick={() => deletefile(attach.fileName)}
                          />
                        </div>
                      </div>
                    </>
                  ))
                )}
              </>
            )}

            <div className="resParty-next">
              <h1>Next Responsible Party</h1>
              <span className="edit-span" onClick={editParty}>
                {showParty ? <CancelIcon /> : "Edit"}
              </span>
            </div>
            {!showParty ? (
              <>
                <p key={ticketNumber} className="res-p">
                  {selectTicket.nextResponsible}
                </p>
              </>
            ) : (
              " "
            )}
            {showParty ? (
              <NextResParty onPartyChange={editParty} info={ticketNumber} />
            ) : (
              ""
            )}

            <div className="my-details-head">
              <h1>Details</h1>
              <span className="edit-span" onClick={editTicket}>
                {open ? <CancelIcon /> : "Edit"}
              </span>
            </div>
            <div className="my-details-content">
              {open ? (
                <EditRow onStateChange={editTicket} info={ticketNumber} />
              ) : (
                <>
                  <div className="details-div">
                    <span>ID</span> <p>{selectTicket.ticketId}</p>
                  </div>
                  <div className="details-div">
                    <span>Title</span> <p>{selectTicket.title}</p>
                  </div>
                  <div className="details-div">
                    <span>Project Tag</span> <p>{selectTicket.projectTag}</p>
                  </div>
                  <div className="details-div">
                    <span>Priority</span> <p>{selectTicket.priority}</p>
                  </div>
                  <div className="details-div">
                    <span>Category</span> <p>{selectTicket.category}</p>
                  </div>
                  <div className="details-div">
                    <span>Submitted By</span> <p>{selectTicket.submittedBy}</p>
                  </div>
                  <div className="details-div">
                    <span>Submitted Date</span>{" "}
                    <p>{moment(selectTicket.submittedDate).format("L")}</p>
                  </div>
                  <div className="details-div">
                    <span>Due Date</span>{" "}
                    <p>{moment(selectTicket.dueDate).format("L")}</p>
                  </div>
                </>
              )}
            </div>
            <div className="peep">
              <h1>People</h1>
              <p className="edit-p" onClick={editIgn}>
                {showIgn ? <CancelIcon /> : "Edit"}
              </p>
            </div>
            {showIgn ? (
              <EditList onStChange={editIgn} info={ticketNumber} />
            ) : (
              <>
                <div className="people">
                  {responsible.map((nxt) => (
                    <div key={nxt.id} className="peo-frag">
                      <img
                        src={nxt.profilePath ? nxt.profilePath : accimg}
                        className="img-pro"
                      />
                      <p>{nxt.fullName}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTickets;
