import React, { useState, useEffect } from "react";
import axios from "axios";

const URL = "http://localhost:3000";

const Upload_Profile_Public = () => {
  const [data, setData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [formDataUserPublic, setFormDataUserPublic] = useState({
    InputUserId: "",
    InputNickName: "",
    InputCountry: ""
  });

  const fetchCountryData = async () => {
    try {
      const response = await axios.get(URL + "/country");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCountryData();
    fetchPublicUserData(); // Fetch public user data when the component mounts
  }, []);
  const fetchPublicUserData = async () => {
    try {
      const response = await axios.get(URL + "/userGetPublic");
      // Assuming only one user is fetched
      if (response.data.length > 0) {
        const userDataPublic = response.data[0];
        setFormDataUserPublic({
          InputUserId: userDataPublic.scsemppri_id,
          InputNickName: userDataPublic.scsemppub_nickname,
          InputCountry: userDataPublic.scsemppub_countrycode
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const postPublicUserData = async (formDataUserPublic) => {
    try {
      const response = await axios.post(URL + "/userPostPublic", formDataUserPublic);
      console.log(response.data);
      // Fetch data again after posting if needed
    } catch (error) {
      console.error(error);
    }
  };
/*
  const handleCountrySelect = (countryId) => {
    const country = data.find((country) => country.csem_id === countryId);
    setSelectedCountry(country);
    setFormDataUserPublic({ ...formDataUserPublic, InputCountry: country.csem_country_name });
  };
*/
  const handleSubmit = (e) => {
    e.preventDefault();
    postPublicUserData(formDataUserPublic);
  };
  const handleCountrySelect = (countryId) => {
    const country = data.find((country) => country.csem_id === countryId);
    if (country) {
      setSelectedCountry(country);
      setFormDataUserPublic(prevState => ({
        ...prevState,
        InputCountry: country.csem_country_name
      }));
    }
  };
  return (
            <>
                <div class="col-md-6 bg-light border-0 bg-dark text-white">
            <legend>
            <span class="label label-default"><b>PRIVATE DETAILS</b></span>
              <h6  class="mt-1 mb-1">Note: This information will be displayed in public and visible for all users.</h6> 
            </legend>
            <div class="col-md-3 col-sm-3 col-xs-3">&nbsp;</div>
            <div class="col-md-3 col-sm-3 col-xs-3">&nbsp;</div>
            <form id="formpublic" class="well well-lg" onSubmit={(e) => {
      e.preventDefault();   
      postPublicUserData(formDataUserPublic);
    }}>
            <div class="form-group row">
                    <label for="InputNickName" class="col-sm-6 col-form-label">Name/ Nickname</label>
                    <div class="col-sm-6">
                    <input type="text" className="form-control" id="InputNickName" name="InputNickName" value={formDataUserPublic.InputNickName} placeholder="Nickname" onChange={(e) => setFormDataUserPublic({ ...formDataUserPublic, InputNickName: e.target.value })} /></div>
                </div>

                <div class="form-group row">
                    <label for="exampleInputCountry" class="col-sm-6 col-form-label">Country</label>
                    <div class="col-sm-6">
                    <select
              onChange={(e) => handleCountrySelect(parseInt(e.target.value))}
              name="InputCountry"
              value={formDataUserPublic.InputCountry}
            >
              <option value="">Select a country</option>
              {data.map((country) => (
              <option key={country.csem_id} value={country.csem_country_code}>
              {country.csem_country_name}
            </option>
              ))}
            </select>

      {selectedCountry && (
        <div>
          <h6>Selected Country Details</h6>
          <p>ID: {selectedCountry.csem_id}</p>
         {/* <p>Name: {selectedCountry.csem_country_name}</p> */ }
          {/* Add more user details here */}
        </div>
      )}
               
                </div>
                </div>
                <div class="form-group row">
                    <label for="exampleInputProfilePic" class="col-sm-6 col-form-label">Profile Picture/ Avatar/ Logo</label>
                    <div class="col-sm-6">
                    <input type="file" class="form-control-file btn btn-secondary btn-sm active" id="exampleInputProfilePic" onchange="return fileValidation()"></input>
                   
                </div>
                <small id="profilePicHelp" class="form-text text-white   text-righ">JPG, GIF or PNG files supported, Max file size 700 KB</small>
                </div>
                <div class="col-md-3 col-sm-3 col-xs-3">&nbsp;</div><div class="col-md-3 col-sm-3 col-xs-3">&nbsp;</div><div class="col-md-3 col-sm-3 col-xs-3">&nbsp;</div>
                <input type="text"  id="InputUserId" name="InputUserId" value={formDataUserPublic.InputUserId}  />
     
                <button type="submit" class="btn btn-secondary btn-sm active  float-end">Save Changes</button>
            </form>
        </div>
 
            </>
        )
    }

export default Upload_Profile_Public;
