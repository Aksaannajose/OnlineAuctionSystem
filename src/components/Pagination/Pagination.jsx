import React, { useEffect, useState } from 'react';
import './Pagination.css';
import API_BASE_URL from '../../utilities/env';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Pagination = () => {
  const userId = localStorage.getItem('userId');
  const [packages, setPackages] = useState([]);
  const [packagess, setPackagess] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [viewBids, setViewBids] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const logOut = () => {
    if (window.confirm('Are you sure want to logout?')) {
      localStorage.clear();
      navigate('/login');
    }
  };

  const getAll = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/liveAuctions`);
      setPackages(response.data);
      setFilteredPackages(response.data);
      console.log(`Response------>${response.data}`);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getBids = async (aucId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bids/${aucId}`);
      setPackagess(response.data);
      // setFilteredPackages(response.data);
      console.log(`Response------>${response.data}`);
      setViewBids(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };




  useEffect(() => {
    getAll();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid.";
    } else if (!/\S+@(gmail\.com|yahoo\.com)$/.test(email)) {
      newErrors.email = "Email must be a valid gmail.com or yahoo.com address.";
    }
    if (!phone) {
      newErrors.phone = "Phone is required.";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }
    if (!address) {
      newErrors.address = "Address is required.";
    }
    if (!bidAmount) {
      newErrors.bidAmount = "Bid amount is required.";
    } else if (isNaN(bidAmount)) {
      newErrors.bidAmount = "Bid amount must be a number.";
    }
    return newErrors;
  };

  const showForm = (aucId) => {
    setSelectedBookId(aucId);
    setIsModalOpen(true);
  };

  const handleBidNow = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/makebid`, {
        auctionid: selectedBookId,
        biddermail: email,
        phone: phone,
        address: address,
        bidamnt: bidAmount
      });
      if (response.status === 200) {
        alert('Bid added successfully..!!');
        getAll();
        setIsModalOpen(false);
        setEmail('');
        setPhone('');
        setAddress('');
        setBidAmount('');
      } else {
        alert('Failed to add bid..!!');
      }
    } catch (err) {
      console.log(`Error while adding bid..${err}`);
      alert('Failed to add bid..!!');
    }
  };

  return (
    <>
      <h2 className='packages-heading mb-4'>Items Live Now</h2>
      <div className="container">
        <div className="row">
          {filteredPackages.map((pack) => (
            <div key={pack.auctionid} className="col-md-4 mb-4">
              <div className="card card1">
                <img src={`data:image/jpeg;base64,${pack.imagebase64}`} className="card-img-top" alt={pack.item} />
                <div className="card-body">
                  <h3 className="card-title rec_Name main_ttl">{pack.item}</h3>
                  <p className="card-text expl main_ttl">Base Price: {pack.baseprice}</p>
                  <p className="card-text expl main_ttl">Details: {pack.explanation}</p>
                </div>
                <div className='card-body'>
                  <button
                    className="btn book-now-btn mt-2"
                    onClick={() => showForm(pack.auctionid)}
                  >
                    Bid Now
                  </button>
                </div>
                <div className='card-body'>
        <button
          className="btn book-now-btn"
          onClick={() => getBids(pack.auctionid)}>
          View Bids
        </button>
      </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {viewBids && <>
      <h2 className='packages-heading mb-4'>Your Bids</h2>
      <div className="container">
        <div className="row">
          {packages.map((pack) => (
            <div key={pack.bookid} className="col-md-4 mb-4">
              <div className="card card1">
                <img src={`data:image/jpeg;base64,${pack.imagebase64}`} className="card-img-top" alt={pack.name} />
                <div className="card-body">
                  <h3 className="card-title rec_Name main_ttl">{pack.item}</h3>
                  <p className="card-text expl main_ttl">Base Price: {pack.baseprice}</p>
                  <p className="card-text expl main_ttl">Details: {pack.explanation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </> }

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Bid Details"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Bid Details</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleBidNow(); }}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="bidAmount">Bid Amount</label>
            <input
              type="text"
              className="form-control"
              id="bidAmount"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              required
            />
            {errors.bidAmount && <span className="error">{errors.bidAmount}</span>}
          </div>
          <button type="submit" className="btn btn-primary mt-2">Add Bid</button>
        </form>
        <button onClick={() => setIsModalOpen(false)} className="btn btn-secondary mt-2">Cancel</button>
      </Modal>
    </>
  );
};

export default Pagination;
