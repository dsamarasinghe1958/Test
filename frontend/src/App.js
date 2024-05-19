import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Countries from "./Countries";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import Upload from './local-upload/Upload'
import Login from './page/Login';
//import Upload_Profile_Public from './local-upload/Upload_Profile_Public'
//import Upload_Profile_Private from './local-upload/Upload_Profile_Private'
import video from './assets/videos/204306-923909642_small.mp4';
const URL = "http://localhost:3000";

function App() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [countries, setCountries] = useState([]);  
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const [selectedUser, setSelectedUser] = useState(null); // ---1
 
  useEffect(() => {
    fetchUserData();//---2
  }, []);
  useEffect(() => {
    fetchCountryData();
  }, []);
  const handleUserSelect = (userId) => {
    const user = data.find((user) => user.id === userId);//---4
    setSelectedUser(user);
  };
  const fetchUserData = async () => {
    try {
      const response = await axios.get(URL + "/user");
      setData(response.data);
      // Assign fetched data to form fields
      if (response.data.length > 0) {
        const userData = response.data[0]; // Assuming only one user is fetched
        console.log(userData);
        setFormData({
          InputUserId: userData.scsemppri_id,
          InputFirstName: userData.scsemppri_first_name,
          InputLastName: userData.scsemppri_last_name,
          InputPhone: userData.scsemppri_phone,
          InputAltEmail: userData.scsemppri_alt_email
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const fetchCountryData = async () => {
    try {
      const response = await axios.get(URL + "/country");
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const [formData, setFormData] = useState({
    InputFirstName: "",
    InputLastName: "",
    InputPhone: "",
    InputAltEmail: ""
  });
  return (

<div className="App" class="container-fluid">
      <div class="row">
        <div class="col-sm-6 col-md-7 mh-100 intro-content-wrapper border border-2">

<video className='videoTag' autoPlay loop muted>
    <source src={video} type='video/mp4' />
</video> 

        </div>
        <div class="col-sm-6 col-md-5 form- bg-dark">
  
          <Router>
        <Routes>
          <Route path="/" element={<Login />}/>

        </Routes>
      </Router>
           
        </div>
      </div>
    </div>

  );
}

export default App;

