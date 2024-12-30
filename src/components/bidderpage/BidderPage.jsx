import { useState, useEffect } from "react";
import './bidderpage.css'
import { Banner } from "./Banner";
import axios from "axios";
import API_BASE_URL from "../../utilities/env";

function BidderPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bidsPerPage, setBidsPerPage] = useState(9);
  const [filter, setFilter] = useState(false);
  const [live, setLive] = useState(false);
  const [past, setPast] = useState(false);
  const [all, setAll] = useState(false);
  const [viewByAdmin, setViewByAdmin] = useState([]);
  const [viewBids, setViewBids] = useState(false);
  const [viewByAdmin1, setViewByAdmin1] = useState([]);
  const [viewBids1, setViewBids1] = useState(false);
  const [viewByAdmin2, setViewByAdmin2] = useState([]);
  const [viewBids2, setViewBids2] = useState(false);


  const getBidsPast = async (aucId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bids/${aucId}`);
      setViewByAdmin(response.data);
      // setFilteredPackages(response.data);
      console.log(`Response------>${response.data}`);
      setViewBids(true);
      setViewBids1(false);
      setViewBids2(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const getBidsPast1 = async (aucId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bids/${aucId}`);
      setViewByAdmin1(response.data);
      // setFilteredPackages(response.data);
      console.log(`Response------>${response.data}`);
      setViewBids(false);
      setViewBids1(true);
      setViewBids2(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const getBidsPast2 = async (aucId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bids/${aucId}`);
      setViewByAdmin2(response.data);
      // setFilteredPackages(response.data);
      console.log(`Response------>${response.data}`);
      setViewBids(false);
      setViewBids1(false);
      setViewBids2(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const addAuction = () => {
    console.log(`Working..!!`);
    setFilter(true);
    setPast(false);
    setLive(false);
  };

  const liveAuction = () => {
    setLive(true);
    setFilter(false);
    setPast(false);
    setAll(false);
    setViewBids(true);
    setViewBids1(false);
    setViewBids2(false);
  }

  const pastAuction = () => {
    setPast(true);
    setLive(false);
    setFilter(false);
    setAll(false);
    setViewBids(false);
    setViewBids1(false);
    setViewBids2(true);
  }


  const allAuction = () => {
    setPast(false);
    setLive(false);
    setFilter(false);
    setAll(true);
    setViewBids(false);
    setViewBids1(true);
    setViewBids2(false);
  }


  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [details, setDetails] = useState('');
  const [pacImg, setPacImg] = useState('');
  const [imgFile, setImgFile] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImgFile(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result.split(',')[1];
      setPacImg(base64);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const addAnItem = async (event) => {
    event.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.post(`${API_BASE_URL}/createAuction`, {
        item: name,
        baseprice: price,
        explanation: details,
        imagebase64: pacImg
      });
      if (response.data.auctionId != null) {
        alert('Auction Created Successfully..!!');
        setName('');
        setPrice('');
        setDetails('');
        setImgFile('');
      } else {
        alert('Failed to create auction..!!');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to create auction..!!');
    }
  };



  const [liveAuctions, setLiveAuctions] = useState([]);
  const [allAuctions, setAllAuctions] = useState([]);
  const [pastAuctions, setPastAuctions] = useState([]);

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
    const getAllAuctions = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`${API_BASE_URL}/allauctions`);
        if (response != null) {
          setAllAuctions(response.data);
          console.log(`Response------>${allAuctions}`);
        }
        else {
          alert('No items in All auction..!!')
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getAllAuctions();
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


  const endAuction = async (aucId) => {
    console.log(`Auc_Id----?${aucId}`);

    event.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.put(`${API_BASE_URL}/endAuction/${aucId}`);
      if (response.message = 'Auction status updated to 2.') {
        getLiveAuctions();
        alert('Auction Ended Successfully..!!');
      } else {
        alert('Auction Ended Successfully..!!');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to end auction..!!');
    }
  };

  return (
    <>
      <Banner />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
        <button className="book-now-btn1" onClick={() => addAuction()}>Add Auction</button>
        <button className="book-now-btn1" onClick={() => liveAuction()}>Live Auctions</button>
        <button className="book-now-btn1" onClick={() => pastAuction()}>Past Auctions</button>
        <button className="book-now-btn1" onClick={() => allAuction()}>All Auctions</button>
      </div>
      {filter && <div>
        <div className='formAlign'>
          <div className='addForm'>
            <form onSubmit={addAnItem}>
              <legend>Create Auction</legend>
              <div className="form-group">
                <label htmlFor="recipeName">Item Name</label>
                <input type="text" value={name} className="form-control" id="recipeName" onChange={(e) => setName(e.target.value)} required aria-describedby="emailHelp" />
              </div>
              <div className="form-group">
                <label htmlFor="ingrediants">Base price</label>
                <input type="text" value={price} className="form-control" onChange={(e) => setPrice(e.target.value)} required id="ingrediants" />
              </div>
              <div className="form-group">
                <label htmlFor="explanation">Explanation</label>
                <input type="text" value={details} className="form-control" onChange={(e) => setDetails(e.target.value)} required id="explanation" />
              </div>
              <div className="form-group">
                <label htmlFor="formFile">Item Image</label>
                <input className="form-control" type="file" id="formFile" onChange={handleImageChange} />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>}


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
                    className="btn book-now-btn mt-2"
                    onClick={() => endAuction(pack.auctionid)}
                  >
                    End Auction
                  </button>
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


      {all && <div className="containner">
        <div className="row">
          <h1 className="main_ttl mt-4" style={{ textAlign: 'center', fontWeight: 'bold' }}>All Auctions</h1>
          {allAuctions.map((pack) => (
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
                    onClick={() => getBidsPast1(pack.auctionid)}>
                    View Bids
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>}



      {viewBids1 && <div className="containner">
        <div className="row">
          <h1 className="main_ttl mt-4" style={{ textAlign: 'center', fontWeight: 'bold' }}>All Auctions Bids</h1>
          {viewByAdmin1.map((pack) => (
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
                <img src={`data:image/jpeg;base64,${pack.imagebase64}`} className="card-img-top" alt={pack.item} />
                <div className="card-body">
                  <h3 className="card-title rec_Name main_ttl">{pack.item}</h3>
                  <p className="card-text expl main_ttl">Base Price: {pack.baseprice}</p>
                  <p className="card-text expl main_ttl">Details: {pack.explanation}</p>
                </div>
                <div className='card-body'>
                  <button
                    className="btn book-now-btn"
                    onClick={() => getBidsPast2(pack.auctionid)}>
                    View Bids
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>}



      {viewBids2 && <div className="containner">
        <div className="row">
          <h1 className="main_ttl mt-4" style={{ textAlign: 'center', fontWeight: 'bold' }}>Past Auctions Bids</h1>
          {viewByAdmin2.map((pack) => (
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


    </>
  );
}

export default BidderPage;
