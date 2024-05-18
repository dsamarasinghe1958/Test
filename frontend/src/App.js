import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Upload_Profile_Private from "./Components/Upload_Profile_Private";
import Upload_Profile_Public from "./Components/Upload_Profile_Public";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import vedeio1 from './assets/videos/204306-923909642_small.mp4';
import Login from './page/Login';
//import Register from './Page/Register';
//import PersonalInfo from './Page/PersonalInfo';
//import Profile from './Profile';
const URL = "http://localhost:3001";
function App() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [initialUserData, setInitialUserData] = useState([]);
  const [initialPublicUserData, setInitialPublicUserData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchDataPublic();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(URL + "/userGetPrivate");
      setInitialUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataPublic = async () => {
    try {
      const response = await axios.get(URL + "/userGetPublic");
      setInitialPublicUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const postData = async () => {
    try {
      const response = await axios.post(URL + "/userPostPrivate", {
        data: inputValue,
      });
      console.log(response.data);
      fetchData(); // Fetch data again after posting
    } catch (error) {
      console.error(error);
    }
  };
  const postPublicData = async () => {
    try {
      const response = await axios.post(URL + "/userPostPublic", {
        data: inputValue,
      });
      console.log(response.data);
      fetchDataPublic(); // Fetch data again after posting
    } catch (error) {
      console.error(error);
    }
  };
  const [formData, setFormData] = useState({
    InputFirstName: "",
    InputLastName: "",
    InputPhone: "",
    InputAltEmail: "",
  });
  const [formDataUserPublic, setFormDataUserPublic] = useState({
    InputNickName: "",
    InputCountry: "",
  });
  const fetchUserData = async () => {
    try {
      const response = await axios.get(URL + "/userGetPrivate");
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
          InputAltEmail: userData.scsemppri_alt_email,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchPublicUserData = async () => {
    try {
      const response = await axios.get(URL + "/userGetPublic");
      setData(response.data);
      // Assign fetched data to form fields
      if (response.data.length > 0) {
        const userDataPublic = response.data[0]; // Assuming only one user is fetched
        console.log(userDataPublic);
        setFormDataUserPublic({
          InputUserId: userDataPublic.scsemppri_id,
          InputNickName: userDataPublic.scsemppub_nickname,
          InputCountry: userDataPublic.scsemppub_countrycode,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const tbinit = async () => {
    try {
      const response = await axios.post(URL + "/tbinit");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
 
    <div class="row">
    <div class="col-sm-8 px-0 d-none d-sm-block" style={{background: "rgba(3, 4, 7, 0.80); border-top-left-radius: 20px; border-top-right-radius: 20px"}}> 
    <video className='videoTag video-background' style={{color: "red"}} autoPlay loop muted>
    <source src={vedeio1} type='video/mp4' />
</video>
      </div>
      <div class="col-sm-4 text-white">
        <div class="">

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
