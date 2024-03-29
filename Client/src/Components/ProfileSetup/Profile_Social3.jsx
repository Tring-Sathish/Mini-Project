import React, { useEffect } from "react";
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
import { useLazyQuery, useMutation } from "@apollo/client";
import { insertOrganization, getUserById, updataUserById } from "../../Pages/hasura-query.ts"

function Profile_Social3() {
  const location = useLocation();
  // const { basicInfo, image } = location.state;

  // => A new object which can handle old + new value to pass to the next component using useNavigate()
  const [socialDetails, setSocialDetails] = useState({
    facebook_url: "",
    insta_url: "",
    linkedin_url: "asd",
    yt_url: "dsa",
  });

  const [username, setUserName ] = useState();
  const [getUser] = useLazyQuery(getUserById, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
    setUserName(data?.users?.[0]?.username);
    },
    onError: (e) => {
      console.log("Error",e);
    }
  })
  useEffect(()=> {
    getUser({
      variables: {
        id: localStorage.getItem("id")
      }
    })
  },[])
  //An data object to pass it to the next Route
  const Office_Profile = {
    office_details: location.state,
    social_links: socialDetails,
  };
  const navigate = useNavigate();

  // var { Office_Profile } = location.state;

  const data = {
    username: username,
    organization_name: Office_Profile.office_details.office_Value.name,
    phoneNo: Office_Profile.office_details.office_Value.phone_no,
    website: Office_Profile.office_details.office_Value.website,
    // logo_url: Office_Profile.office_details.office_Value.logo.image,
    departments: Office_Profile.office_details.office_Value.department.options,
    office_address: Office_Profile.office_details.office_Value.office_location,
    office_city: Office_Profile.office_details.office_Value.city,
    office_country: Office_Profile.office_details.office_Value.country,
    region: Office_Profile.office_details.office_Value.region,
    fb_url: Office_Profile.social_links.facebook_url,
    insta_url: Office_Profile.social_links.insta_url,
    linkedIn_url: Office_Profile.social_links.linkedin_url,
    yt_url: Office_Profile.social_links.yt_url,
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
  const [updateUser] = useMutation(updataUserById, {
    fetchPolicy: "network-only",
    onCompleted:(data) => {},
    onError:(e) => { console.log("Error", e); }
  });

  const [insertOrg] = useMutation(insertOrganization, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
          navigate("/profilesetup/sucess");
          localStorage.setItem("organization_id", data?.insert_organizations?.returning?.[0]?.id);
          updateUser({
            variables: {
              id : localStorage.getItem("id"),
              data : {
                "org_registered": true,
                "org_id": data?.insert_organizations?.returning?.[0]?.id
              }   
            }
          })
      },
      onError: (error) => {
        console.log(error);
        alert("Something went wrong, try again with proper data");
      },
  });
  const post_Method = () => {
    insertOrg({
      variables: {
        data: {
          ...data,
          ...logo
        }
      }
    })
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

        <Link to="/">
          <p className="heading4 text-center mt-2 text-gray-400 cursor-pointer">
            Go back to HOME
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Profile_Social3;
