import axios from "axios";
import React, { useEffect, useState } from "react";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
import { useNavigate } from "react-router-dom";
import Illustration from "../../assets/illustrations/no_user.svg";
import { getAllOrgs } from "../../Pages/hasura-query.ts"
import { useLazyQuery } from "@apollo/client"

function JobOrg() {
  const [data, setData] = useState();
  const [imageSrc, setImageSrc] = useState("/docs/")

  const [ getOrgs ] = useLazyQuery(getAllOrgs, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setData(data.organizations);
    },
    onError: (e) => {
      console.log("Error",e);
    }
  })
  useEffect(() => {
    getOrgs();
  }, []);
  
  const navigate = useNavigate();
  const handleMe = (id) => {};

  return (
    <div className="flex bg-white">
      <div className="hidden sm:block w-2/12  h-screen">
        <LeftMenuBar />
      </div>
      <div className="w-full bg-background">
        <div className="p-0">
          <TopNavigationBar title={"Jobs"} />
          <div className="rounded-md p-4 mt-2">
        { data?.length != 0 ? 
        <h2 className="heading2 mt-4 text-center font-bold">
        All Organizations
        </h2> : 
        <><img
        src={Illustration}
        width={350}
        height={300}
        className="block m-auto mt-20"
        ></img>
        <h2 className="heading2b text-center mt-12">
          No Organizatins Found
        </h2></>
      }
        <div className="flex gap-8 mt-12 flex-wrap justify-center items-center mb-12">
          {data?.map((e, index) => {
            return (
              <>
                <div key={index} className="card w-80 bg-base-100 shadow-xl" 
                  onClick={() =>
                    handleMe(navigate(`/portal/job/${e.id}`))
                  } >
                    <figure><img style={{marginTop: "10px"}} width={150} src={ "/docs/" + e?.logo } alt="" /></figure>
                    <div className="divider"></div> 
                    <div className="card-body">
                        <h2 className="card-title">{ e?.organization_name }</h2>
                        <p></p>
                        <p ><label className="font-medium">Phone No : </label>{e?.phoneNo}</p>
                        <p ><label className="font-medium">Website : </label>{e?.website}</p>
                        <p ><label className="font-medium">Address : </label>{e?.office_address}</p>
                    </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}

export default JobOrg;
