import React from 'react';
import "../../assets/css/Navbar.css";
import { useGetSignedUserQuery } from '../../store/api/userApi';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const { data: signedUser } = useGetSignedUserQuery();
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/login'); 
  };

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
        {signedUser?.payload?.name ? (
          <h1> {signedUser.payload.name}</h1>
        ) : (
          <h1 onClick={handleSignInClick} style={{ cursor: 'pointer' }}>
            Sign In
          </h1>
        )}
      </div>
    </div>
  );
}

export default NavBar;
