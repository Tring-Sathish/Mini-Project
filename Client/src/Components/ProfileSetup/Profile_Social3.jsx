import React from "react";
import axios from "axios";
import NavigationTab from "../Dashboard/ProfileCreation/NavigationTab";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";

function Profile_Social3() {
  const location = useLocation();
  // const { basicInfo, image } = location.state;
  console.log(location.state);

  // => A new object which can handle old + new value to pass to the next component using useNavigate()
  const [socialDetails, setSocialDetails] = useState({
    facebook_url: "",
    insta_url: "",
    linkedin_url: "asd",
    yt_url: "dsa",
  });
  console.log(socialDetails);

  //An data object to pass it to the next Route
  const Office_Profile = {
    office_details: location.state,
    social_links: socialDetails,
  };
  const navigate = useNavigate();

  // var { Office_Profile } = location.state;

  const data = {
    name: Office_Profile.office_details.office_Value.name,
    phone: Office_Profile.office_details.office_Value.phone_no,
    website_link: Office_Profile.office_details.office_Value.website,
    // logo_url: Office_Profile.office_details.office_Value.logo.image,
    departments: {
      list: Office_Profile.office_details.office_Value.department.options,
    },

    address: Office_Profile.office_details.office_Value.office_location,

    city: Office_Profile.office_details.office_Value.city,
    country: Office_Profile.office_details.office_Value.country,
    region: Office_Profile.office_details.office_Value.region,
    fb_link: Office_Profile.social_links.facebook_url,
    insta_link: Office_Profile.social_links.insta_url,
    linkedin_link: Office_Profile.social_links.linkedin_url,
    yt_link: Office_Profile.social_links.yt_url,
  };
  const logo = Office_Profile.office_details.office_Value.logo.image;
  // const [team_details, setTeamDetails] = useState({
  //   name: "null",
  //   email: "as@asd.com",
  //   role: "admin",
  // });

  const cv = {
    logo: logo,
    detailed_data: data,
    // team_details: team_details,
  };
  const [type, setType] = useState();
  const post_Method = () => {

    const options = {
      url: "http://localhost:8080/profile/setup",
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
        // "Content-Type": "application/json;charset=UTF-8",
      },
      data: cv,
    };
    axios(options)
      .then((response) => {
        console.log(" i am running");
        console.log(response.status);
        if (response.status == 200) {
          navigate("/profilesetup/sucess");
        } else if (response.status == 400) {
          alert("Organization is already registered!");
        } else if (response.status == 404) {
          alert("NO USER WITH THIS USERNAME EXIST IN THE SYSTEM");
        } else {
          alert("Something went wrong, try again with proper data");
        }
      })
      .catch((e) => {
        alert("Organzation is already registered");
      });
  };

  return (
    <div>
      {" "}
      <div className="bg-white modalShadow w-3/5 m-auto mt-10  pb-12 ">
        <NavigationTab
          first_value={"Organization"}
          second_value={"Office Details"}
          third_value={"Social Links"}
          fourth_value={""}
          active={3}
          text={3}
        />
        {/* THIS MENUE MAIN INPUT CONTENT */}
        <div className="mt-12 w-3/4 m-auto ">
          <h2 className="heading3 ">Add Social Link's</h2>

          {/* HANDLING SOCIAL INPUT */}

          <div className="flex mt-8">
            <div className=" flex">
              <FaFacebookF className="text-3xl mr-3 text-blue-800" />
              <input
                type="url"
                name="f_name"
                id="f_name"
                onChange={(e) =>
                  setSocialDetails((oldValue) => ({
                    ...oldValue,
                    facebook_url: e.target.value,
                  }))
                }
                placeholder="Facebook Profile"
                autoComplete="on"
                className="input input-bordered h-10 w-full max-w-xs inline"
              />
            </div>

            <div className=" flex ml-6">
              <FaLinkedinIn className="text-3xl mr-3 text-blue-600" />
              <input
                type="url"
                name="f_name"
                id="f_name"
                onChange={(e) =>
                  setSocialDetails((old) => ({
                    ...old,
                    linkedin_url: e.target.value,
                  }))
                }
                placeholder="LinkedIn"
                autoComplete="on"
                className="input input-bordered h-10 w-full max-w-xs inline"
              />
            </div>
          </div>

          {/* HERE IS THE 2ND LINES OF SOCIAL LINK UI CODE */}

          <div className=" flex mt-10">
            <div className=" flex">
              <FaInstagram className="text-3xl mr-3 text-pink-500" />
              <input
                type="url"
                name="f_name"
                id="f_name"
                onChange={(e) =>
                  setSocialDetails((old) => ({
                    ...old,
                    insta_url: e.target.value,
                  }))
                }
                placeholder="Insta Page"
                autoComplete="on"
                className="input input-bordered h-10 w-full max-w-xs inline"
              />
            </div>

            <div className="flex ml-6">
              <FaYoutube className="text-4xl mr-3 text-red-500" />
              <input
                type="url"
                name="f_name"
                id="f_name"
                onChange={(e) =>
                  setSocialDetails((old) => ({
                    ...old,
                    yt_url: e.target.value,
                  }))
                }
                placeholder="YouTube Channel"
                autoComplete="on"
                className="input input-bordered h-10 w-full max-w-xs inline"
              />
            </div>
          </div>
        </div>
        {/* <button
          onClick={() =>
            navigate("/profilesetup/addteam", { state: { Office_Profile } })
          }
          type="submit"
          className=" mt-12 btnfont btn btn-wide  bg-primary border-none hover:bg-black text-center m-auto block "
        >
          NEXT{" "}
        </button> */}
        <button
          // onClick={() => navigate("/profilesetup/sucess")}
          onClick={post_Method}
          type="submit"
          className=" mt-12 btnfont btn btn-wide  bg-primary border-none hover:bg-black text-center m-auto block "
        >
          NEXT{" "}
        </button>

        <Link to="/home">
          <p className="heading4 text-center mt-2 text-gray-400 cursor-pointer">
            Go back to HOME
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Profile_Social3;
