import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../utilities/env';
// import { jwtSignupHandler } from '../../utilities/auth';
import './signup.css';
import axios from 'axios';

function Signup({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUserType] = useState('');
  const [errors, setErrors] = useState([]);

  const signupSuccessCallback = () => {
    navigate('/login');
  };

  const handleSignupSubmit = async (evt) => {
    evt.preventDefault();
    const formData = { usertype, email, password };
    console.log(formData);
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, formData);
      if (response.status === 200) {
        alert('Registered Successfully..!!');
        signupSuccessCallback();
      } else {
        alert('Failed to Register..!!');
        signupFailureCallback(response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to Register..!!');
      if (error.response) {
        setErrors(error.response.data.errors || []);
      }
    }
  };

  return (
    <>
      <form className="container" onSubmit={handleSignupSubmit} style={{ margin: '50px 350px' }}>
        <div className="signup-card" style={{ height: '650px' }}>
          <div className="user signup_form">
            <div className="form">
              <div className="text_signup">
                <h3>Create An Account</h3>
                <h4 className="text-muted">Sign up for free</h4>
                <p>
                  Already have an account?{' '}
                  <a href="#" className="signin-click" onClick={() => navigate('/login')}>
                    Sign In
                  </a>
                </p>
              </div>

              <div className="input-text-signup">
                <input
                  type="text"
                  name="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <i className="fa fa-envelope-o"></i>
                <label>
                  E-mail<span style={{ color: 'red' }}>*</span>
                </label>
              </div>

              <div className="input-text-signup">
                <input
                  type="password"
                  className="password_input"
                  name="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i className="fa fa-eye-slash"></i> <label>Password<span style={{ color: 'red' }}>*</span></label>
              </div>

              <select
                className="input-text-signup form-select form-select-sm"
                aria-label=".form-select-sm example"
                onChange={(e) => setUserType(e.target.value)}
              >
                <option selected disabled>
                  Choose Account type
                </option>
                <option>User</option>
              </select>
              {errors.length > 0 &&
                errors.map((err) => (
                  <li style={{ color: 'red', fontSize: '12px' }} key={err}>
                    {err}
                  </li>
                ))}
              <div className="signup-button">
                <button type="submit">Sign up</button>
              </div>
              <div className="policy">
                <p>
                  By clicking Sign up, you agree to our <a href="#">Terms and Conditions</a>.
                </p>
              </div>
            </div>
            <div className="image-box">
              <img
                src="https://media.istockphoto.com/id/1011430662/photo/bid-button-on-computer-keyboard.jpg?b=1&s=170667a&w=0&k=20&c=32NdAneAoQm6eFwlI5msMfH-_d5-XYpkdhUIK3jZH_8="
                alt="Signup"
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Signup;
