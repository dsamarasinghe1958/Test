import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const URL = "http://localhost:3000";

const Upload_Profile_Public = () => {
  const [data, setData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [formDataUserPublic, setFormDataUserPublic] = useState({
    InputUserId: "",
    InputNickName: "",
    InputCountry: "",
    InputProfilePic: "",
    Input64Img: "",
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
      if (response.data.length > 0) {
        const userDataPublic = response.data[0];
        setFormDataUserPublic({
          InputUserId: userDataPublic.scsemppri_id,
          InputNickName: userDataPublic.scsemppub_nickname,
          InputCountry: userDataPublic.scsemppub_countrycode,
          InputProfilePic: userDataPublic.scsemppri_picture,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const postPublicUserData = async (formDataUserPublic) => {
    try {
      await axios.post(URL + "/userPostPublic", formDataUserPublic);
      toast.success("Public Data Successfully updated.");
    } catch (error) {
      console.error(error);
      toast.error("Error submitting data. Please try again later.");
    }
  };

  const postImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(URL + "/uploadImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.filePath;
    } catch (error) {
      console.error(error);
      toast.error("Error uploading image. Please try again later.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = formDataUserPublic.InputProfilePic;

    if (file) {
      const uploadedImageUrl = await postImage(file);
      if (uploadedImageUrl) {
        imageUrl = uploadedImageUrl;
      }
    }

    const updatedFormData = { ...formDataUserPublic, InputProfilePic: imageUrl };
    postPublicUserData(updatedFormData);
  };

  const handleCountrySelect = (selectedCountryCode) => {
    setFormDataUserPublic({
      ...formDataUserPublic,
      InputCountry: selectedCountryCode,
    });
  };

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const ref = useRef();
  const ref64 = useRef();
  useEffect(() => {
    if (!file) {
      return;
    }

    const fileExtension = file.name.split(".").pop().toLowerCase();
    const allowedFileTypes = ["jpg", "png", "gif"];
    if (!allowedFileTypes.includes(fileExtension)) {
      toast.error(`File type must be ${allowedFileTypes.join(", ")}`);
      ref.current.value = "";
      return;
    }

    if (file.size > 700 * 1024) {
      toast.error("File with maximum size of 700KB is allowed");
      ref.current.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
      ref64.current.value = reader.result;
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  }, [file]);

  return (
    <>
      <div className="col-md-6 bg-light border-0 bg-dark text-white">
        <legend>
          <span className="label label-default">
            <b>PUBLIC DETAILS</b>
          </span>
          <h6 className="mt-1 mb-1">
            Note: This information will be displayed in public and visible for
            all users.
          </h6>
        </legend>

        <ToastContainer />
        <form id="formpublic" className="well well-lg" onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="InputNickName" className="col-sm-6 col-form-label">
              Name/ Nickname
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                id="InputNickName"
                name="InputNickName"
                value={formDataUserPublic.InputNickName}
                placeholder="Nickname"
                onChange={(e) =>
                  setFormDataUserPublic({
                    ...formDataUserPublic,
                    InputNickName: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="exampleInputCountry" className="col-sm-6 col-form-label">
              Country
            </label>
            <div className="col-sm-6">
              <select
                onChange={(e) => handleCountrySelect(e.target.value)}
                name="InputCountry"
                value={formDataUserPublic.InputCountry}
              >
                <option value="">Select a country</option>
                {data.map((country) => (
                  <option
                    key={country.csem_id}
                    value={country.csem_country_code}
                  >
                    {country.csem_country_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="exampleInputProfilePic" className="col-sm-6 col-form-label">
              Profile Picture/ Avatar/ Logo
            </label>
            <div className="col-sm-6">
            <input
  type="file"
  name="file"
  multiple
  id="input-files"
  class="form-control-file border"
/>
              <input
                type="file"
                className="custom-file-input image-gallery"
                ref={ref}
                accept="image/png, image/gif, image/jpeg"
                id="InputFile image-gallery"
                name="InputFile"
                onChange={(e) => setFile(e.target.files[0])}
              />
              {previewUrl && (
                <img
                  height="50"
                  src={previewUrl}
                  alt="Preview"
                  id="InputProfilePic"
                  name="InputProfilePic"
                />
              )}
            </div>
            <small id="profilePicHelp" className="form-text text-white">
              JPG, GIF or PNG files supported, Max file size 700 KB
            </small>
          </div>
          <input
            type="hidden"
            id="InputUserId"
            name="InputUserId"
            value={formDataUserPublic.InputUserId}
          />
          <textarea id="Input64Img" ref={ref64} name="Input64Img" />
          <button type="submit" className="btn btn-secondary btn-sm active float-end">
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
};

export default Upload_Profile_Public;
