import axios from "axios";
import React, { useState, useEffect } from "react";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
// import { useDispatch } from "react-redux";

function HomePage() {
  // const dispatch = useDispatch();

  //to store is user setup the organization profile or not
  const [profileSetup, setProfileSetup] = useState(false);
  const [organizationData, setOrganizationData] = useState();
  const [organizationDeatails, setOrganizationDetails] = useState();
  const CheckAuth = async () => {
    axios
      .post(
        "http://localhost:8080/home",
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then(function (response) {
        if (response.data.org_registered == true) {
          localStorage.setItem("user_id", response.data._id);
          localStorage.setItem("organization_id", response.data.org_id);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  
  useEffect(() => {
    CheckAuth();
  }, [profileSetup]);

  return (
    <div className="flex bg-white">
      <div className="hidden sm:block w-2/12  h-screen">
        <LeftMenuBar />
      </div>
      <div className="w-full bg-background">
        <div className="p-0">
          <TopNavigationBar title={"Home"} />
            <>
              <h1 className="heading1 ml-12  mt-20 text-transparent text-3xl sm:text-6xl bg-clip-text bg-gradient-to-r from-blue-500 to-black">
                Welcome to Smart Cruiter
              </h1>
              <div className="bg-white w-full sm:w-3/5 rounded-xl m-auto mt-4 topNavigationBoxShadow">
                {/* <ProfileSetup /> */}
              </div>
            </>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
