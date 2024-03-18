import React,{useState, useContext} from "react";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
import ProfilePic from "../../assets/icons/profileIcon.png";
import { useMutation } from "@apollo/client";
import { insertEmployee } from "../../Pages/hasura-query.ts"
import { useNavigate } from "react-router-dom";
import { globalContext } from "../../App.js";

function AddNewEmployee() {

  const org_id = localStorage.getItem("organization_id")
  const { globalState, handleGlobalState } = useContext(globalContext);
  const [data,setData] = useState();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    org_id: org_id,
    name: "",
    email: "",
    role: "",
    skill: "",
    education: "",
    experience: "",
    performance: ""
  });
  
  const [ addEmployee ] = useMutation(insertEmployee, {
    onCompleted: (data) => {
      setData(data);
      const tempstate = {...globalState};
      tempstate.employeeAddRefresh = true;
      handleGlobalState(tempstate);
      navigate("/employees");
    },
    onError: (e) => {
      console.log("Error",e);
    }
  })
  
  const handlesubmit = () => {
    addEmployee({
      variables: {
        data: {
          ...employee
        }
      }
    })
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
              placeholder="abc@gmail.com"
              className="input input-bordered w-full max-w-xs"
              value={employee.email}
                onChange={(e) =>
                  setEmployee((old) => ({
                    ...old,
                    email: e.target.value,
                  }))
                }
            />

            <label className="label">
              <span className="label-text heading4">Role </span>
            </label>
            <input
              type="text"
              placeholder="Developer"
              className="input input-bordered w-full max-w-xs"
              value={employee.role}
                onChange={(e) =>
                  setEmployee((old) => ({
                    ...old,
                    role: e.target.value,
                  }))
                }
            />
            <label className="label">
              <span className="label-text heading4">Skills </span>
            </label>
            <input
              type="text"
              placeholder="HTML,CSS"
              className="input input-bordered w-full max-w-xs"
              value={employee.skill}
                onChange={(e) =>
                  setEmployee((old) => ({
                    ...old,
                    skill: e.target.value,
                  }))
                }
            />
            <label className="label">
              <span className="label-text heading4">Education </span>
            </label>
            <input
              type="text"
              placeholder="B.Sc/M.Sc"
              className="input input-bordered w-full max-w-xs"
              value={employee.education}
                onChange={(e) =>
                  setEmployee((old) => ({
                    ...old,
                    education: e.target.value,
                  }))
                }
            />
            <label className="label">
              <span className="label-text heading4">Experience </span>
            </label>
            <input
              type="text"
              placeholder="1..."
              className="input input-bordered w-full max-w-xs"
              value={employee.experience}
                onChange={(e) =>
                  setEmployee((old) => ({
                    ...old,
                    experience: e.target.value,
                  }))
                }
            />

            <label className="label">
              <span className="label-text heading4">Performance </span>
            </label>
            <select className="select select-bordered"
            onChange={(e) =>
              // setTeamDetails((old) => ({ ...old, role: e.target.value }))
              setEmployee((old) => ({
                ...old,
                performance: e.target.value,
              }))
            }>
              <option disabled selected>
                Pick one
              </option>
              <option>Good</option>
              <option>Average</option>
              <option>Low</option>
            </select>
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
