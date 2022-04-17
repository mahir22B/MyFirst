import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './ReportScreen.css'
import { CircularProgress, FormControl, FormControlLabel, Radio, RadioGroup, Select } from '@mui/material';
import { Bar,Line } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";

const ReportScreen = () => {

    const [data, setData] = useState([]);

    const [lineValue, setLineValue] = useState('Daily');

    useEffect(()=>{
        const abortCont = new AbortController();
        setTimeout(()=>{
          axios.get(`/reports`,{ signal:abortCont.signal })
          .then(response => setData(response.data.data))
          .catch(err=>console.log(err))
        },800)
        return () => abortCont.abort(); 
      },[])

      const [chartData, setChartData] = useState({datasets: [{
        label: "Report 1",
        data:[],
    }, ],
        labels:[],  
    }
    );

      useEffect(()=>{
          const abortCont = new AbortController();
            axios.get(`/reports/barGraph`,{ signal:abortCont.signal })
            .then(response =>{ 
                const label = [];
                const chData = [];
                const chDatac = [];
                for(let i of response.data.data){
                    label.push(i.month)
                    chData.push(i.opened)
                    chDatac.push(i.closed)
            }
            setChartData({datasets: [{
                label: "Opened",
                data:chData.reverse(),
                backgroundColor:[
                    '#F0754D',
                ]
            },{
                label: "Closed",
                data:chDatac.reverse(),
                backgroundColor:[
                    '#0A387D',
                ]
            }],
                labels:label.reverse(),  
            },)
        })
            .catch(err=>console.log(err))
          return () => abortCont.abort(); 
        },[])


        const [lineChart, setLineChart] = useState({datasets: [{
            label: "Report 1",
            data:[],
        }, ],
            labels:[],  
        }
        );


        useEffect(()=>{
            const abortCont = new AbortController();
              axios.get(`/reports/${lineValue}`,{ signal:abortCont.signal })
              .then(response =>{ 
                const label = [];
                const lneData = [];
                const lneDatac = [];
                const lneDataP = [];
                for(let i of response.data.data){
                    label.push(i.name)
                    // console.log(i);
                    lneData.push(i.opened)
                    lneDatac.push(i.closed)
                    lneDataP.push(i.inProgress)
            }
            setLineChart({datasets: [{
                label: "Opened",
                data:lneData.reverse(),
                backgroundColor:[
                    '#F0754D',
                ]
            },{
                label: "Closed",
                data:lneDatac.reverse(),
                backgroundColor:[
                    '#0A387D',
                ]
            },{
                label: "In-Progress",
                data:lneDataP.reverse(),
                backgroundColor:[
                    '#228B22',
                ]
            }],
                labels:label.reverse(), 
            },)
        })
            .catch(err=>console.log(err))
          return () => abortCont.abort(); 
        },[lineValue])


  return (
    <div className='report-screen'>
        <div className='charts'>
            <div className='chart1'>
           <Bar data={chartData} height={300} width={300}/>
            </div>
            <div className='chart2'>
            <Line data={lineChart} height={300} width={300}/>
            <FormControl>
                <RadioGroup
                    value={lineValue} onChange={(e) => { (setLineValue(e.target.value)) }}
                    row
                    >
                    <FormControlLabel value="Daily" control={<Radio />} label="Daily" />
                    <FormControlLabel value="Weekly" control={<Radio />} label="Weekly" />
                    <FormControlLabel value="Monthly" control={<Radio />} label="Monthly" />
                </RadioGroup>
            </FormControl>
            </div>
        </div>
        <div className='text-data'>
            <div className='title-data'>
            <div className='div-name'>
                <span>Name</span>
                </div>
                <div className='tix-p'>
                <p>Total Tickets</p>
                </div>
                <div className='open-p'>
                <p>Opened</p>
                </div>
                <div className='in-p'>
                <p>In-Progress</p>
                </div>
                <div className='work-p'>
                <p>Work Completed</p>
                </div>
                <div className='cls-p'>
                <p>Ticket Closed</p>
                </div>
            </div>
            <div>
            {data < 1 ? <CircularProgress/> : data.map((dt,id)=>(
            <>
            <div className='answer-data' key={dt + id}>
            {/* <input type="checkbox"/>     */}
                <div className='name-div'>
                <span>{dt.name} {dt.email}</span>
                </div>
                <p>{dt.totalTickets}</p>
                <p>{dt.opened}</p>
                <p>{dt.inProgress}</p>
                <p>{dt.completed}</p>
                <p>{dt.closed}</p>
            </div>
            </>
            ))}
            </div>
        </div>
    </div>
  )
}

export default ReportScreen