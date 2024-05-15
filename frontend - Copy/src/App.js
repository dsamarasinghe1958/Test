import "./App.css";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import Upload_Profile_Private from './local-upload/Upload_Profile_Private';
const URL = "http://localhost:3000";
function App() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [initialUserData, setInitialUserData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(URL + "/user");
      setInitialUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const postData = async () => {
    try {
      const response = await axios.post(URL + "/user", { data: inputValue });
      console.log(response.data);
      fetchData(); // Fetch data again after posting
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

  const tbinit = async () => {
    try {
      const response = await axios.post(URL + "/tbinit");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App" class="p-3 mb-2 bg-dark text-dark">
    
    <div class="container mt-5">
        <div class="row">
        <Upload_Profile_Private initialUserData={initialUserData} />


        </div>
    </div>      
        </div>
  );
}

export default App;