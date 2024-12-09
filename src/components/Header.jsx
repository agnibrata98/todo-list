import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    // const handleRefresh = () => {
    //     window.location.reload();
    // }
  return (
    <>
        <div style={{display:'flex', gap:'20px', justifyContent:'center', alignItems:'center', padding:'20px', backgroundColor:'black', color:'white'}}>
            <Link to='/' style={{textDecoration: 'none', color: 'white', fontWeight: 'bold'}}>Home</Link>
            <Link to='/randomtodo' style={{textDecoration: 'none', color: 'white', fontWeight: 'bold'}}>Random Todo</Link>
            {/* <Link to='/create' style={{textDecoration: 'none', color: 'white', fontWeight: 'bold'}}>Create Todo</Link> */}
        </div>
    </>
  )
}

export default Header