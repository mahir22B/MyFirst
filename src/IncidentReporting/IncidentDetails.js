import React from 'react'
import "./IncidentDetails.css"

const IncidentDetails = () => {
  return (
    <div className="Incident-Details">
     <div className="card-details">
            <div className="card-top">
                <span>ID-37</span>
            </div>
            <p className="card-para">Reebok Analytics Reports- fail to run due tables</p>
            <div className="card-mid">
                <span>
                    Status
                    <p className="status-para">
                    Open
                    </p>
                </span>
                <span>
                    Report Date
                    <p>
                    03/10/2022-12:31
                    </p>
                </span>
            </div>
            <div className="card-bottom-2">
                <span className="incident-auth">
                    Author
                    <p>
                    John Doe
                    </p>
                </span>
                <span className="incident-res">
                    Responsible Person
                    <p className="Names-incident">
                   Torin Dial
                   Mahir Bhatt
                   Arif Jameel
                   Nisha J
                    </p>
                </span> 
            </div>
        </div>
    </div>
  )
}

export default IncidentDetails