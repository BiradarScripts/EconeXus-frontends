import React, { useEffect, useContext, useState,useRef} from "react";
import UserContext from "../context/user/userContext";
import Dropdown from '../components/Dropdown'
import ImageContext from "../context/image/imagaContext";
import profileLogo from './profile_logo.png';

export default function Profile() {

  const targetRef=useRef(null)

  const [updateDrop,setUpdateDrop]=useState([]);
  const [updatePostImage, setUpdatePostImage]=useState({ myFile : ""})
  const [refresh,setRefresh]=useState(0);

  const userContext = useContext(UserContext);
  const imageContext=useContext(ImageContext);

  const { currentUser, getCurrentUser,editUser} = userContext;
  const {getImage,imageData,updateImage}=imageContext;



  useEffect(() => {
    getImage();
    getCurrentUser();
  }, [refresh]);

  const handleOnClick=()=>{
    setRefresh(1);
    if(updateImage){
      updateImage(updatePostImage)
    }
    if(updateDrop){
      editUser(updateDrop)
    }
    setRefresh(0)
    targetRef.current.click()
    window.location.reload();
  }

  const handleFileUpdate=async (e)=>{
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64)
    setUpdatePostImage({ ...updatePostImage, myFile : base64 })
  }

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModala"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Editing your profile
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">

         
              <div className="middleware">
                <form>
                  <label htmlFor="file-upload" className="custom-file-upload">
                    {imageData ? <img src={imageData} alt="Profile" /> : <img src={profileLogo} alt="/"/>}
                  </label>

                  <input
                    type="file"
                    lable="Image"
                    name="myFile"
                    id="file-upload"
                    accept=".jpeg, .png, .jpg"
                    onChange={(e) => handleFileUpdate(e)}
                  />

                </form>
              </div>

                    
            <Dropdown updateDrop={updateDrop} setUpdateDrop={setUpdateDrop} interestD={currentUser.interestsData}/>

            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={targetRef}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary mx-3" onClick={handleOnClick}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="profile">
        <div className="profile-box">
          <div className="edit">
            <i
              className="fa-solid fa-pen-to-square"
              style={{ cursor: "pointer" }}
              data-bs-toggle="modal"
              data-bs-target="#exampleModala"
            ></i>
          </div>
          <div className="upperprofile-pic">
            <img src={imageData} className="profile-pic" alt="Profile" />
          </div>
          
          <div className="profile-name">
            {currentUser.firstName} {currentUser.lastName}
          </div>
          <div className="about">{currentUser.userName}</div>
          <div className="links">
            <i
              className="fa-brands fa-instagram"
              style={{ cursor: "pointer" }}
            ></i>
            <i
              className="fa-brands fa-linkedin"
              style={{ cursor: "pointer" }}
            ></i>
            <i
              className="fa-brands fa-github"
              style={{ cursor: "pointer" }}
            ></i>
          </div>
          <div className="profile-bottom">
            <p>
              I am currently interested in{" "}
              {currentUser.interestsData?.map((interest) => interest + " ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}