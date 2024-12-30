import { useNavigate } from "react-router";
import "./seller.css"
import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../utilities/env";

function Seller({ user }) {
  const [live, setLive] = useState(false);
  const [past, setPast] = useState(false);
  const [pastAuctions, setPastAuctions] = useState([]);
  const [liveAuctions, setLiveAuctions] = useState([]);
  const [packagess, setPackagess] = useState([]);
  const [viewByAdmin, setViewByAdmin] = useState([]);
  const [viewBids, setViewBids] = useState(false);
  const [viewBidsAdmin, setViewBidsAdmin] = useState(false);


  useEffect(() => {
    const getLiveAuctions = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`${API_BASE_URL}/liveAuctions`);
        if (response.data != null) {
          setLiveAuctions(response.data);
          console.log(`Response------>${liveAuctions}`);
        }
        else {
          alert('No items in Live auction..!!')
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getLiveAuctions();
  }, []);


  useEffect(() => {
    const getPastAuctions = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`${API_BASE_URL}/pastAuctions`);
        if (response != null) {
          setPastAuctions(response.data);
          console.log(`Response------>${pastAuctions}`);
        }
        else {
          alert('No items in past auction..!!')
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getPastAuctions();
  }, []);


  const liveAuction = () => {
    setLive(true);
    setPast(false);
    setViewBidsAdmin(false);
  }

  const pastAuction = () => {
    setPast(true);
    setLive(false);
    setViewBids(false);
  }


  const getBids = async (aucId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bids/${aucId}`);
      setViewByAdmin(response.data);
      // setFilteredPackages(response.data);
      console.log(`Response------>${response.data}`);
      setViewBids(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const getBidsPast = async (aucId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bids/${aucId}`);
      setViewByAdmin(response.data);
      // setFilteredPackages(response.data);
      console.log(`Response------>${response.data}`);
      setViewBids(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 30 }}>
        <button className="book-now-btn1" onClick={() => liveAuction()}>Live Auctions</button>
        <button className="book-now-btn1" onClick={() => pastAuction()}>Past Auctions</button>
      </div>
      {live && <div className="containner">
        <div className="row">
          <h1 className="main_ttl mt-4" style={{ textAlign: 'center', fontWeight: 'bold' }}>Live Auctions</h1>
          {liveAuctions.map((pack) => (
            <div key={pack.auctionid} className="col-md-3 mb-4 mt-4">
              <div className="card card1">
                <img src={`data:image/jpeg;base64,${pack.imagebase64}`} className="card-img-top" alt={pack.item} />
                <div className="card-body">
                  <h3 className="card-title rec_Name main_ttl">{pack.item}</h3>
                  <p className="card-text expl main_ttl">Base Price: {pack.baseprice}</p>
                  <p className="card-text expl main_ttl">Details: {pack.explanation}</p>
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
      </div>}

      {viewBids && <div className="containner">
        <div className="row">
          <h1 className="main_ttl mt-4" style={{ textAlign: 'center', fontWeight: 'bold' }}>Live Auctions Bids</h1>
          {viewByAdmin.map((pack) => (
            <div key={pack.auctionid} className="col-md-3 mb-4 mt-4">
              <div className="card card1">
                <div className="card-body">
                  <h3 className="card-title rec_Name main_ttl">{pack.item}</h3>
                  <p className="card-text expl main_ttl">Email: {pack.biddermail}</p>
                  <p className="card-text expl main_ttl">Address: {pack.address}</p>
                  <p className="card-text expl main_ttl">Phone: {pack.phone}</p>
                  <p className="card-text expl main_ttl">Amount: {pack.bidamnt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>}

      {past && <div className="containner">
        <div className="row">
          <h1 className="main_ttl mt-4" style={{ textAlign: 'center', fontWeight: 'bold' }}>Past Auctions</h1>
          {pastAuctions.map((pack) => (
            <div key={pack.auctionid} className="col-md-3 mb-4 mt-4">
              <div className="card card1">
                <div className="card-body">
                  <h3 className="card-title rec_Name main_ttl">{pack.item}</h3>
                  <p className="card-text expl main_ttl">Base Price: {pack.baseprice}</p>
                  <p className="card-text expl main_ttl">Details: {pack.explanation}</p>
                </div>
                <div className='card-body'>
                  <button
                    className="btn book-now-btn"
                    onClick={() => getBidsPast(pack.auctionid)}>
                    View Bids
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>}

      {viewBidsAdmin && <div className="containner">
        <div className="row">
          <h1 className="main_ttl mt-4" style={{ textAlign: 'center', fontWeight: 'bold' }}>Past Auctions Bids</h1>
          {viewByAdmin.map((pack) => (
            <div key={pack.auctionid} className="col-md-3 mb-4 mt-4">
              <div className="card card1">
                <img src={`data:image/jpeg;base64,${pack.imagebase64}`} className="card-img-top" alt={pack.item} />
                <div className="card-body">
                  <h3 className="card-title rec_Name main_ttl">{pack.item}</h3>
                  <p className="card-text expl main_ttl">Email: {pack.biddermail}</p>
                  <p className="card-text expl main_ttl">Address: {pack.address}</p>
                  <p className="card-text expl main_ttl">Phone: {pack.phone}</p>
                  <p className="card-text expl main_ttl">Amount: {pack.bidamnt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>}
    </>
  )

}

export default Seller;