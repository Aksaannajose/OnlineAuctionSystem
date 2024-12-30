import './login.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import API_BASE_URL from '../../utilities/env';
import { jwtLoginHandler, getJSONPayloadFromJwt } from '../../utilities/auth';
import axios from 'axios';

const Login = ({ user, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUserType] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  function loginSuccessCallback() {
    if (usertype == 'Auctioner') {
      navigate('/auctions');
      window.location.reload();
    } else if (usertype == 'Admin') {
      navigate('/seller');
      window.location.reload();
    } else if (usertype == 'User') {
      navigate('/pagination')
      window.location.reload();
    }
  }

  async function loginFailureCallback(responsePromise) {
    const response = await responsePromise.json();
    setErrors(response.errors);
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const loginRequestBody = { usertype, email, password };
    // eslint-disable-next-line max-len
    // jwtLoginHandler(loginRequestBody, `${API_BASE_URL}/login`, loginSuccessCallback, loginFailureCallback);  
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, loginRequestBody);
      console.log(`Response is---->${response}`);
      
      if (response.data.userId != null) {
        alert('Login Success..!!');
        loginSuccessCallback();
        localStorage.setItem('userId', response.data.userId);
      }
      else {
        alert('Login Denied..!!');
        loginFailureCallback();
      }
    }
    catch (err) {
      console.log(`Error is..${err}`);
    }
  }

  return (
    <div class="vh-100 d-flex justify-content-center align-items-center">
      <div class="container">
        <div class="row d-flex justify-content-center">
          <div class="col-12 col-md-8 col-lg-6">
            <div class="card bg-white">
              <div class="card-body p-5">
                <form class="mb-3 mt-md-4" onSubmit={handleSubmit}>
                  <h2 class="fw-bold mb-2 text-muted">Account Login</h2>
                  <p class=" mb-5 text-muted">Please enter your login details and password!</p>
                  <select style={{ marginBottom: 30 }} class="input-text-signup form-select form-select-sm" aria-label=".form-select-sm example" onChange={(e) => setUserType(e.target.value)}>
                    <option selected disabled>Choose Account type</option>
                    <option>User</option>
                    <option>Admin</option>
                    <option>Auctioner</option>
                  </select>
                  <div class="mb-3">
                    <label htmlfor="username" class="form-label ">Email<span className='text-danger'>*</span></label>
                    <input type="text" class="form-control" id="username" name="username" onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div class="mb-3">
                    <label htmlfor="password" class="form-label ">Password<span className='text-danger'>*</span></label>
                    <input type="password" class="form-control" id="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                  <div class="d-grid">
                    <button className="btn btn-outline-primary" type="submit">
                      Log In
                    </button>
                  </div>
                  {
                    errors?.length > 0 ? errors.map((error) => <p style={{ color: "red", fontSize: "12px" }} className="text-center" key={error}>{error}</p>) : ""
                  }
                </form>
                <div>
                  <p class="mb-0  text-center">Don't have an account? <Link to='/signup' class="text-primary fw-bold">Sign
                    Up</Link></p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;