import axios from "axios";
import React, { useEffect, useState } from "react";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
import { useNavigate } from "react-router-dom";

function Jobss() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:8080/job/get-all-jobs"
      );
      setData(response.data.fetchAllPostedJobs);
    };

    fetchData();
  }, [0]);
  
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
        <h2 className="heading2 mt-4 text-center font-bold">
          All posted jobs
        </h2>

        <div className="flex gap-8 mt-12 flex-wrap justify-center items-center mb-12">
          {data?.map((e, index) => {
            return (
              <>
                <div
                  key={index}
                  onClick={() =>
                    handleMe(navigate(`/portal/job/description/${e._id}`))
                  }
                  className="cursor-pointer w-52 rounded-lg text-center flex items-center h-52 bg-white bg-opacity-20 shadow-sm shadow-gray-900
                hover:bg-gray-700 hover:border hover:border-solid border-gray-800 hover:text-gray-200"
                >
                  <h2 className="heading2b  text-center  hover:text-gray-200 ml-8">
                    {e.jobPosition}
                  </h2>
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

export default Jobss;
