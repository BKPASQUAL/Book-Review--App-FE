import React from 'react'
import "../../assets/css/Navbar.css"

function NavBar() {
  return (
    <div className='navbar-main'>
      <div className='navbar-left'>
          <h1>Review</h1><h2>Book</h2>  
      </div>
      <div className='navbar-mid'>
        <p>Home</p>
        <p>Category</p>
        <p>All Books</p>
        <p>Blogs</p>
      </div>
      <div className='navbar-right'>
        <h1>Sing In</h1>
      </div>
    </div>
  )
}

export default NavBar
