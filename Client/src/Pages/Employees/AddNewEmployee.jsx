import React,{useState} from "react";
import axios from "axios";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
import ProfilePic from "../../assets/icons/profileIcon.png";
function AddNewEmployee() {

  const org_id = localStorage.getItem("organization_id")
  const [data,setData] = useState();
  const [employee, setEmployee] = useState({
    org_id: org_id,
    name: "",
    email: "",
    // role: "",
  });
  
  
  const handlesubmit = () => {
    const options = {
      url: "http://localhost:8080/addEmployee",
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: localStorage.getItem("token"),
        // "Content-Type": "multipart/form-data",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: employee,
    };
    axios(options)
      .then((response) => {
        // console.log(" i am running");
        console.log(response.data);
        setData(response.data)
        
      })
      .catch((e) => {
        alert("Something Wrong");
      });
  }

  return (
    <div className="flex bg-white">
      <div className="hidden sm:block w-2/12 bg-white h-screen">
        <LeftMenuBar />
      </div>
      <div className="w-full bg-background">
        <div className="p-0">
          <TopNavigationBar title={"Employee Update"} />
        </div>

        <div className="p-6 mt-12 bg-white w-3/4 block m-auto rounded-md  modalShadow">
          <h2 className="heading3 text-center font-medium mt-4">
            Add employee information
          </h2>

          <img src={ProfilePic} className="block m-auto mt-4"></img>
          <div className="form-control w-full max-w-xs mt-8 ml-8">
            <label className="label">
              <span className="label-text heading4">Name</span>
            </label>
            <input
              type="text"
              placeholder="Humza Sajid"
              className="input input-bordered w-full max-w-xs"
              value={employee.name}
                onChange={(e) =>
                  setEmployee((old) => ({
                    ...old,
                    name: e.target.value,
                  }))
                }
            />

            <label className="label">
              <span className="label-text heading4">Email </span>
            </label>
            <input
              type="text"
              placeholder="HumzaSajid@Microsoft.com"
              className="input input-bordered w-full max-w-xs"
              value={employee.email}
                onChange={(e) =>
                  setEmployee((old) => ({
                    ...old,
                    email: e.target.value,
                  }))
                }
            />

            {/* <label className="label">
              <span className="label-text heading4">Select role:</span>
            </label>
            <select className="select select-bordered"
            onChange={(e) =>
              setTeamDetails((old) => ({ ...old, role: e.target.value }))
            }>
              <option disabled selected>
                Pick one
              </option>
              <option>Medium Level</option>
              <option>High Level</option>
              <option>Low Level</option>
            </select> */}
          </div>
          <button className="btn text-center m-auto block border-none bg-primary mt-8"
          onClick={handlesubmit}>
            Add{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNewEmployee;
