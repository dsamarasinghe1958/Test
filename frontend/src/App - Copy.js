import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Countries from "./Countries";
//import Upload from './local-upload/Upload'
//import Upload_Profile_Public from './local-upload/Upload_Profile_Public'
//import Upload_Profile_Private from './local-upload/Upload_Profile_Private'
const URL = "http://localhost:3000";

function App() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [countries, setCountries] = useState([]);  
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // ---1
  const handleCountrySelect = (countryId) => {
    const country = data.find((country) => country.csem_id === countryId);//---4
    setSelectedCountry(country);
  };
  useEffect(() => {
    fetchUserData();//---2
  }, []);
  const fetchCountryData = async () => {
    try {
      const response = await axios.get(URL + "/country");
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCountryData();
  }, []);
  const handleUserSelect = (userId) => {
    const user = data.find((user) => user.id === userId);//---4
    setSelectedUser(user);
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
  const Upload = () => {
      const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState([]);
    const [img, setNewImage] = useState([]); 
    const [data, setData] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [countries, setCountries] = useState([]);  
    const handleChange = (e) => {
      setInputValue(e.target.value);
    };
    const onSub= async (e)=>{
      let formData=new FormData();
      formData.append("imgfile",image[0])
      formData.append("newimg",img[0])
      formData.append("name",name)
      formData.append("email",email)
  e.preventDefault()

  //let res=await axios.post("http://localhost:3000/imgupload",formData);
  const res = await axios.post("http://localhost:3000/imgupload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  console.log("-------imgformData-----");
  console.log(formData);   
    }
    const postUserData = async (formData) => {
      try {
     
        const response = await axios.post(URL + "/user", formData);
        console.log('--------ok------------');
        console.log(response.data);
         fetchUserData(); // Fetch data again after posting
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="App" class="p-3 mb-2 bg-dark text-dark">

<div class="container mt-5">
    <div class="row">
    <div className="col-md-6 bg-light border-0 bg-dark text-white">
      <legend>
        <span className="label label-default"><b>PRIVATE DETAILS</b></span>
        <h6 className="mt-1 mb-1">Note: This information will not be displayed in public.</h6>
      </legend>
      <div className="col-md-3 col-sm-3 col-xs-3">&nbsp;</div><div className="col-md-3 col-sm-3 col-xs-3">&nbsp;</div>
      <form   id="formpublic" onSubmit={(e) => {
        e.preventDefault();   
        postUserData(formData);
      }}>
        <div className="form-group row">
         <label htmlFor="exampleInputEmail1" className="col-sm-6 col-form-label">Email</label>
          <div className="col-sm-6">
          <button type="button" className="btn btn-secondary btn-sm active">Change Email</button>
          </div>
          <div className="col-sm-3">
                  </div>
        </div>
        <div className="form-group row">
          <label htmlFor="exampleInputPassword1" className="col-sm-6 col-form-label">Password</label>
          <div className="col-sm-6">
          <button type="button" className="btn btn-secondary btn-sm active">Change Password</button>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="exampleInputEmail1" className="col-sm-6 col-form-labelt">Secure your account</label>
          <div className="col-sm-6">
            <button type="button" className="btn btn-secondary btn-sm active">Enable 2-Factor Authentication</button>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="exampleInputName" className="col-sm-6 col-form-label">First Name</label>
          <div className="col-sm-6">
          <input type="text" className="form-control" id="InputFirstName" name="InputFirstName" value={formData.InputFirstName} placeholder="First Name" onChange={(e) => setFormData({ ...formData, InputFirstName: e.target.value })} />
            </div>
        </div>
        <div className="form-group row">
          <label htmlFor="exampleInputLastName" className="col-sm-6 col-form-label">Last Name</label>
          <div className="col-sm-6">
              <input type="text" className="form-control" id="InputLastName" name="InputLastName" value={formData.InputLastName} placeholder="Last Name" onChange={(e) => setFormData({ ...formData, InputLastName: e.target.value })} />
         
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="exampleInputPhone" className="col-sm-6 col-form-label">Phone</label>
          <div className="col-sm-6">
          <div className="form-group">
            <input type="text" className="form-control" id="InputPhone" name="InputPhone" value={formData.InputPhone} placeholder="Phone" onChange={(e) => setFormData({ ...formData, InputPhone: e.target.value })} />
         
            <button type="button" class="btn btn-secondary btn-sm active  float-end">+ Add Phone Number</button>
          </div>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="exampleInputPhone" className="col-sm-6 col-form-label">Alternative Email for Alerts</label>
          <div className="col-sm-6">
            <input type="text" className="form-control" id="InputAltEmail" name="InputAltEmail" value={formData.InputAltEmail} placeholder="Email" onChange={(e) => setFormData({ ...formData, InputAltEmail: e.target.value })} />
         
            <button type="button" class="btn btn-secondary btn-sm active  float-end">+ Add Email</button>
            <small>Email address that can be used to send alerts.</small>
            <input type="hidden"  id="InputUserId" name="InputUserId" value={formData.InputUserId} onChange={(e) => setFormData({ ...formData, InputUserId: e.target.value })} />
       
          </div>
        </div>
        <div className="col-md-3 col-sm-3 col-xs-3">&nbsp;</div><div className="col-md-3 col-sm-3 col-xs-3">&nbsp;</div>
        <button type="submit" className="btn btn-secondary btn-sm active  float-end">Save Changes</button>
      </form>
    </div>
    <div class="col-md-6 bg-light border-0 bg-dark text-white">
            <legend>
            <span class="label label-default"><b>PRIVATE DETAILS new</b></span>
              <h6  class="mt-1 mb-1">Note: This information will be displayed in public and visible for all users.</h6> 
            </legend>
            <div class="col-md-3 col-sm-3 col-xs-3">&nbsp;</div>
            <div class="col-md-3 col-sm-3 col-xs-3">&nbsp;</div>
            <form id="formprivalte" class="well well-lg">
            <div class="form-group row">
                    <label for="exampleInputName" class="col-sm-6 col-form-label">Name/ Nickname</label>
                    <div class="col-sm-6">
                    <input type="text" class="form-control" id="exampleInputName" placeholder="First Name"></input>
                </div>
                </div>

                <div class="form-group row">
                    <label for="exampleInputCountry" class="col-sm-6 col-form-label">Country</label>
                    <div class="col-sm-6"><select onChange={(e) => handleCountrySelect(parseInt(e.target.value))}>
        <option value="">Select a country</option>
        {data.map((country) => (
          <option key={country.csem_id} value={country.csem_id}>
            {country.csem_country_name}
          </option>
        ))}
      </select>

      {selectedCountry && (
        <div>
          <h3>Selected Country Details</h3>
          <p>ID: {selectedCountry.csem_id}</p>
          <p>Name: {selectedCountry.csem_country_name}</p>
          {/* Add more user details here */}
        </div>
      )}
               
                </div>
                </div>
                <div class="form-group row">
                    <label for="exampleInputProfilePic" class="col-sm-6 col-form-label">Profile Picture/ Avatar/ Logo</label>
                    <div class="col-sm-6">
                    <input type="file" class="form-control-file btn btn-secondary btn-sm active" id="exampleInputProfilePic"></input>
                   
                </div>
                <small id="profilePicHelp" class="form-text text-white   text-righ">JPG, GIF or PNG files supported, Max file size 700 KB</small>
                </div>
                <div class="col-md-3 col-sm-3 col-xs-3">&nbsp;</div><div class="col-md-3 col-sm-3 col-xs-3">&nbsp;</div><div class="col-md-3 col-sm-3 col-xs-3">&nbsp;</div>
                <button type="submit" class="btn btn-secondary btn-sm active  float-end">Save Changes</button>
            </form>
        </div>
    </div>
</div>      
    </div>

    
  );
}
}
export default App;
