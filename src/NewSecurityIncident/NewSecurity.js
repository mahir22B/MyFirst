import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Select } from '@mui/material'
import React from 'react'
import { MultiSelect } from 'react-multi-select-component'
import "./NewSecurity.css"

const NewSecurity = () => {
  return (
    <div className="new-sec">
        <div className="sec-title">
            <span>
            Title
            </span>
            <input type="text"/>
        </div>
        <div className="sec-two">
            <div className="sec-two-left">
                <p>
                   Incident Report Category 
                </p>
                <Select className="sec-multi"/>
            </div>
            <div className="sec-two-mid">
                <p>
                    Status
                </p>
            <FormControl>
                <RadioGroup
                    row
                    >
                    <FormControlLabel value="unavailable" control={<Radio />} label="N/A" />
                    <FormControlLabel value="open" control={<Radio />} label="Open" />
                    <FormControlLabel value="close" control={<Radio />} label="Closed" />
                </RadioGroup>
            </FormControl>
            </div>
            <div className="sec-two-right">
            <p>
                Severity Level
            </p>
            <FormControl>
                <RadioGroup
                    row
                   >
                    <FormControlLabel value="low" control={<Radio />} label="Low" />
                    <FormControlLabel value="med" control={<Radio />} label="Medium" />
                    <FormControlLabel value="high" control={<Radio />} label="High" />
                    <FormControlLabel value="cric" control={<Radio />} label="Critical" />
                </RadioGroup>
            </FormControl>
            </div>
        </div>
        <div className="sec-serv">
            <p>
               Server(s) Affected 
            </p>
            <MultiSelect className="sel-multi-sec" options={[]}/>
        </div>
        <div className="sec-serv">
            <p>
               Database(s) Affected 
            </p>
            <MultiSelect className="sel-multi-sec" options={[]}/>
        </div>
        <div className="sec-serv">
            <p>
               Client(s) Affected 
            </p>
            <MultiSelect className="sel-multi-sec" options={[]}/>
        </div>
        <div className="sec-serv">
            <p>
               Web Applications
            </p>
            <MultiSelect className="sel-multi-sec" options={[]}/>
        </div>
        <div className="sec-financial">
            <span>
            Financial Impact
            </span>
            <input type="text"/>
        </div>
    </div>
  )
}

export default NewSecurity