import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CreatedJobElement from "../../Components/Dashboard/CreateJob/CreatedJobElement";
import CreateJobHeadaer from "../../Components/Dashboard/CreateJob/CreateJobHeadaer";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
import { useLazyQuery, useMutation } from "@apollo/client";
import { getAllJobsById } from "../../Pages/hasura-query.ts";
import Illustration from "../../assets/illustrations/no_user.svg";
function CreateJob() {
  const [data, setData] = useState();
  const [getJob] = useLazyQuery(getAllJobsById, {
    onCompleted: (data) => {
      setData(data?.jobs);
    },
    onError: (e) => {
      console.log("Error",e);
    }
  })
  useEffect(() => {
      getJob({
        variables: {
          orgId: localStorage.getItem("organization_id"),
          filter: {}
        }
      })
  }, [0]);

  return (
    <div className="flex bg-white">
      <div className="hidden sm:block w-2/12 bg-white h-screen ">
        <LeftMenuBar />
      </div>
      <div className="w-full bg-background ">
        <div className="p-0">
          <TopNavigationBar title={"Jobs"} />

          <CreateJobHeadaer setData={setData} />
        </div>
        { data?.length != 0 ? 
           <div className="ml-8 flex flex-wrap  gap-6 mt-12 w-11/12 m-auto p-2">
           <CreatedJobElement data={data} setData={setData} />
         </div> :
          <><img
          src={Illustration}
          width={350}
          height={300}
          className="block m-auto mt-20"
          ></img>
          <h2 className="heading2b text-center mt-12">
            No Posted Jobs
          </h2></>
        }
      </div>
    </div>
  );
}

export default CreateJob;
