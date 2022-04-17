import LoginForm from './LoginForm/LoginForm';
import './App.css';
import SideBar from './SideBar/SideBar';
import ContentArea from './ContentArea/ContentArea';
import AllTicketsHeader from './AllTickets/AllTicketsHeader';
import SingleTicket from './SingleTicket/SingleTicket';
import MyTicketsView from './MyTicketView/MyTicketsView';
import KnowledgeBase from './KnowledgeBase/KnowledgeBase';
import Article from './Article/Article';
import CreateArticle from './CreateArticle/CreateArticle';
import {
  Routes,
  Route,
  useNavigate,
  useLocation
} from "react-router-dom";

import jwt_decode from "jwt-decode";
import { Suspense, useEffect, useState,lazy } from 'react';
import { CircularProgress } from '@mui/material';
import ReportScreen from './ReportScreen/ReportScreen';

const Users = lazy(() => import('./Users/Users'))
const IncidentHome = lazy(() => import('./IncidentReporting/IncidentHome'))
const NewSecurity = lazy(() => import('./NewSecurityIncident/NewSecurity'))
const Newticket = lazy(() => import('./CreateNewTicket/Newticket'))


function App() {

  const fetchedToken = localStorage.getItem('token');
  const fetchedRole = JSON.parse(localStorage.getItem('userRole'));
  const location = useLocation()
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] =  useState('');
  

  const searchHandler=(searchTerm)=>{
    setSearchTerm(searchTerm)
  }

  useEffect(()=>{
    if(fetchedToken){
  
        let decodedToken = jwt_decode(fetchedToken);
        console.log("Decoded Token", decodedToken.exp * 1000);
        let currentDate = new Date();
        console.log(currentDate.getTime());
      
        // JWT exp is in seconds
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          console.log("Token expired.");
          navigate('/')
          localStorage.removeItem("token");
          window.location.reload();
        } else {
          console.log("Valid token"); 
        }
      
      }
    else {
      navigate("/")
    }  
  },[location.pathname])


  return (
      <div className="App"> 
      <Routes> 
       
      <Route exact path="/" element={<LoginForm />} />
       
      </Routes>
      <div className="App2">
      <AllTicketsHeader searchKeyword={searchHandler} term={searchTerm}/>
      <SideBar/>
      <Routes>
      

      <Route exact path="/content" element={<ContentArea term={searchTerm} searchKeyword={searchHandler} />} />
      <Route path="/open/:ticketId" element={<SingleTicket />} />
      <Route path="/my" element={<MyTicketsView term={searchTerm}/>} />
      <Route path="/knowledge" element={<KnowledgeBase/>} />
      <Route exact path="/Article/:id" element={<Article/>} />
      <Route exact path="/add" element={<CreateArticle/>} />
      <Route exact path="/report" element={<ReportScreen/>} />
     
      <Route exact path="/users" element={<Suspense fallback={<CircularProgress/>}><Users fetchedRole={fetchedRole}/></Suspense>} />
      <Route exact path="/incident" element={<Suspense fallback={<CircularProgress/>}><IncidentHome/></Suspense>} />
      <Route exact path="/security" element={<Suspense fallback={<CircularProgress/>}><NewSecurity/></Suspense>} />
      <Route path="/create" element={<Suspense fallback={<CircularProgress/>}><Newticket /></Suspense>} />   

    </Routes>
    </div>
    </div>    
  );
}

export default App;
