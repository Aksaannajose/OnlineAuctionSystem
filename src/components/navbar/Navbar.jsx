import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { jwtLogoutHandler } from '../../utilities/auth';
import './navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const [isUserId, setIsUserId] = useState(false);

  const logOutRender  = () =>
  {
    const userId = localStorage.getItem('userId');
    if (userId != null)
    {
      setIsUserId(true);
    }
    else if(userId == undefined){
      setIsUserId(false);
    }
  }


  useEffect(() =>
  {
    logOutRender()
  }, []);

  // function navbarLogoutHandler() {
  //   setUser(null);
  //   jwtLogoutHandler(navigate);
  // }

  const handleLogout = () => {
    if (window.confirm('Are you sure want to logout?')) {
      localStorage.clear();
      navigate('/login');
      logOutRender();
      window.location.reload();
    }
  }


  return (
    <>
      <header id="header">
        <div class="container d-flex align-items-center">
          <NavLink to='/' className="logo me-auto"><img src="/favicon-32x32.png" alt="" class="img-fluid" /><span className='logo-name'>Auctioners</span></NavLink>

          <nav id="navbar" class="navbar">
            <ul>
              <li style={{ fontWeight: 'bold' }} class="nav-link scrollto" onClick={() => handleLogout()}>{isUserId ? 'Logout' : 'Login'}</li>
              {/* <li><NavLink to='/login' class="nav-link scrollto">Sign-in</NavLink></li> */}
              <li><a class="getstarted scrollto" onClick={() => navigate('/signup')}>Get Started</a></li>
            </ul>
            <i class="bi bi-list mobile-nav-toggle"></i>
          </nav>

        </div>
      </header>
    </>
  );


}

export default Navbar;