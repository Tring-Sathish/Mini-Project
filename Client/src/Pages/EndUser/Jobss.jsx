import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
import { useNavigate, useParams } from "react-router-dom";
import Illustration from "../../assets/illustrations/no_user.svg";
import { getAllJobsById } from "../../Pages/hasura-query.ts";
import { useLazyQuery } from "@apollo/client";
import { globalContext } from "../../App.js";

function Jobss() {
  const [data, setData] = useState([]);
  const [org, setOrg] = useState({});
  const { id } = useParams();
  const [jobId, setJobId] = useState();
  const [imageSrc, setImageSrc] = useState("/docs/");
  const [showModal, setShowModal] = useState(false);
  const { globalState, handleGlobalState } = useContext(globalContext);

  const [getJob] = useLazyQuery(getAllJobsById, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setData(data?.jobs);
      setOrg(data?.jobs?.jobToOrg);
      const tempstate = {...globalState};
      tempstate.orgId = data?.jobs?.[0]?.jobToOrg?.id;
      handleGlobalState(tempstate);
    },
    onError: (e) => {
      console.log("Error",e);
      alert("Kindly fill the complete form.");
    }
  })
  
  useEffect(() => {
    getJob({
      variables: {
        orgId: id,
        filter: {}
      }
    })
  }, [id]);

  const navigate = useNavigate();

  const openModal = (j_id) => {
    setShowModal(true);
    setJobId(j_id);
  };

  const closeModal = () => {
    navigate(`/portal/job/apply/${jobId}`);
    setShowModal(false);
  };

  return (
    <div className="flex bg-white">
      <div className="hidden sm:block w-2/12 h-screen">
        <LeftMenuBar />
      </div>
      <div className="w-full bg-background">
        <div className="p-0">
          <TopNavigationBar title={"Jobs"} />
          <div className="rounded-md p-4 mt-2">
            {data.length !== 0 ? (
              <h2 className="heading2 mt-4 text-center font-bold">
                All posted jobs
              </h2>
            ) : (
              <>
                <img
                  src={Illustration}
                  width={350}
                  height={300}
                  className="block m-auto mt-20"
                  alt="No user illustration"
                />
                <h2 className="heading2b text-center mt-12">
                  No Posted Jobs
                </h2>
              </>
            )}
            <div className="flex gap-8 mt-12 flex-wrap justify-center items-center mb-12">
              {data.map((e, index) => (
                <div
                  className="card card-side bg-base-100 shadow-xl"
                  key={index}
                  onClick={() => openModal(e.id)}
                >
                  <figure>
                    <img
                      height={200}
                      src={imageSrc + e?.jobToOrg?.logo}
                      alt="Movie"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      {e.jobPosition}
                      <span className="divider"></span>
                    </h2>
                    <p>
                      <label className="font-medium">About Job : </label>
                      {e.job_description}
                    </p>
                    <p>
                      <label className="font-medium">Salary : </label>
                      {e.salaryRangeFrom} - {e.salaryRangeUpto}
                    </p>
                    <p>
                      <label className="font-medium">Job Type : </label>
                      {e.jobType}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="font-bold text-lg">Welcome!</h3>
            <p className="py-4">
            Please prepare your resume and a photo to apply for the job.
            </p>
            <div className="modal-action">
            <button className="mt-12 btnfont btn bg-primary border-none hover:bg-black text-center  block" onClick={() => setShowModal(false)}>
                Close
              </button>
              <button className="mt-12 btnfont btn bg-primary border-none hover:bg-black text-center block" onClick={closeModal}>
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Jobss;
