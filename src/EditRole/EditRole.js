import { Button, MenuItem, Select } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './EditRole.css'


const EditRole = ({onRoleChange,id}) => {
  const [role, setRole] = useState([])
  const [roleId, setRoleId] = useState(0)
  const [message, setMessage] = useState()


  useEffect(() => {
    axios.get('/role')
      .then(req => setRole(req.data.data))
  }, [])

  const rolechange = (event) => {
    setRoleId(event.target.value)
  };
  
  
  const saveRole = () => {

    let data = JSON.stringify({
      "roleId": roleId,
      "employeeId": id

    });

    const fetchedToken = localStorage.getItem('token');

    let config = {

      method: 'post',

      url: 'http://10.1.130.10:88/dev.tms.api/role',

      headers: {

        'Content-Type': 'application/json',

        'Authorization': `Bearer ${fetchedToken}`

      },
      data: data
    };

    axios(config).then(function (response) {

      console.log((response.data));
      if(response.data.succeeded == false)
      alert(response.data.message);

    }).catch(function (error) {
        console.log('error!',error)
        alert(error)
      })
    onRoleChange();
    setTimeout(function(){
      window.location.reload(1);
   }, 1000); 
  }

  return (
    <>
     <div>

<Select className='select-role'
  name="nextParty"
  value={roleId}
  onChange={rolechange}>
  <MenuItem value="0" disabled>Edit</MenuItem>
  {role.map((erole,index) => (
    <MenuItem key={index} value={erole.id}>{erole.name}</MenuItem>
  ))
  }
</Select>

</div>
        <Button className="role-save-btn" onClick={saveRole}>Save</Button>
        <Button className="role-cancel-btn" onClick={onRoleChange}>Cancel</Button>
        </>
  )
}



export default EditRole