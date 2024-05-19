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
 <div className="App" class="container-fluid px-1 px-md-0 px-lg-1 px-xl-0 py-0 mx-auto">
    <div class="card card0 border-2">
        <div class="row d-flex">
            <div class="col-lg-8">
                <div class="card1 pb-5">

                    <div class="row px-3 justify-content-end mt-4 mb-5 border-line">
                        <img src="https://i.imgur.com/uNGdWHi.png" class="image"/>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card2 card border-2 px-4 py-5">
                    <div class="row mb-4 px-3">
                    <div class="row">
                        <img src="https://i.imgur.com/CXQmsmF.png" class="logo"/>
                    </div>  </div>
                    <div class="row px-3 mb-4">
                        <div class="line"></div>
                        <small class="or text-center">Or</small>
                        <div class="line"></div>
                    </div>
                    <div class="row px-3">
                        <label class="mb-1"><h6 class="mb-0 text-sm">Email Address</h6></label>
                        <input class="mb-4" type="text" name="email" placeholder="Enter a valid email address"/>
                    </div>
                    <div class="row px-3">
                        <label class="mb-1"><h6 class="mb-0 text-sm">Password</h6></label>
                        <input type="password" name="password" placeholder="Enter password"/>
                    </div>
                    <div class="row px-3 mb-4">
                        <div class="custom-control custom-checkbox custom-control-inline">
                            <input id="chk1" type="checkbox" name="chk" class="custom-control-input"/> 
                            <label for="chk1" class="custom-control-label text-sm">Remember me</label>
                        </div>
                        <a href="#" class="ml-auto mb-0 text-sm">Forgot Password?</a>
                    </div>
                    <div class="row mb-3 px-3">
                        <button type="submit" class="btn btn-blue text-center">Login</button>
                    </div>
                    <div class="row mb-4 px-3">
                        <small class="font-weight-bold">Don't have an account? <a class="text-danger ">Register</a></small>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-blue py-4">
            <div class="row px-3">
                <small class="ml-4 ml-sm-5 mb-2">Copyright &copy; 2019. All rights reserved.</small>
                <div class="social-contact ml-4 ml-sm-auto">
                    <span class="fa fa-facebook mr-4 text-sm"></span>
                    <span class="fa fa-google-plus mr-4 text-sm"></span>
                    <span class="fa fa-linkedin mr-4 text-sm"></span>
                    <span class="fa fa-twitter mr-4 mr-sm-5 text-sm"></span>
                </div>
            </div>
        </div>
    </div>
</div>
  );
}

export default App;

