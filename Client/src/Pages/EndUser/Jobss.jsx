import axios from "axios";
import React, { useEffect, useState } from "react";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
import { useNavigate, useParams } from "react-router-dom";
import Illustration from "../../assets/illustrations/no_user.svg";

function Jobss() {
  const [data, setData] = useState([]);
  const [org, setOrg] = useState({});
  const { id } = useParams();
  const [jobId, setJobId] = useState();
  const [imageSrc, setImageSrc] = useState("http://127.0.0.1:8081/uploads/");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        url: "http://localhost:8080/job/get-jobs",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8"
        },
        data: { id: id },
      };
      try {
        const response = await axios(options);
        setData(response.data.jobs);
        setOrg(response.data.org);
      } catch (error) {
        console.log("Error:", error);
        alert("Kindly fill the complete form.");
      }
    };

    fetchData();
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
                  onClick={() => openModal(e._id)}
                >
                  <figure>
                    <img
                      height={200}
                      src={imageSrc + org.logo?.split("\\")?.[1]}
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
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">
              To apply for the Job be ready with your resume and picture.
            </p>
            <div className="modal-action">
              <button className="btn" onClick={closeModal}>
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
