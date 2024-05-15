import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Countries from "./Countries";
import Upload from './local-upload/Upload'
import Upload_Profile_Public from './local-upload/Upload_Profile_Public'
//import Upload_Profile_Private from './local-upload/Upload_Profile_Private'
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
    <div className="App" class="p-3 mb-2 bg-dark text-dark">
<Upload />
<div class="container mt-5">
    <div class="row">
<Upload_Profile_Public />
    </div>
</div>      
    </div>

    
  );
}

export default App;
