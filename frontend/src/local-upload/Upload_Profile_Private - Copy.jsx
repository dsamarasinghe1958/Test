import React, { useState, useEffect } from "react";
import axios from 'axios';
const Upload = () => {
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState([]);
  const [img, setNewImage] = useState([]); 
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [countries, setCountries] = useState([]);  
  const [selectedCountry, setSelectedCountry] = useState(null);
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

const handleCountrySelect = (countryId) => {
  const country = data.find((country) => country.csem_id === countryId);//---4
  setSelectedCountry(country);
};
//let res=await axios.post("http://localhost:3000/imgupload",formData);
const res = await axios.post("http://localhost:3000/imgupload", formData, {
  headers: { "Content-Type": "multipart/form-data" },
});
console.log("-------imgformData-----");
console.log(formData);   
  }
    return (
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

    )
}

export default Upload_Profile_Private;
