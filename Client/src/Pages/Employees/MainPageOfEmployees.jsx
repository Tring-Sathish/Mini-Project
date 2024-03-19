import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
import Illustration from "../../assets/illustrations/no_user.svg";
import { Center } from "@chakra-ui/react";
import { useLazyQuery } from "@apollo/client";
import { getProfilePic, getAllEmployees } from "../../../src/Pages/hasura-query.ts";
import { globalContext } from "../../App.js";

function MainPageOfEmployees() {

  const { globalState, handleGlobalState } = useContext(globalContext);
  const [employee,setEmployee] = useState();
  useEffect(() => {
    getEmployee({
      variables: {
        orgId: localStorage.getItem("organization_id")
      }
    })
  }, [globalState.employeeAddRefresh]);
  const [profileURL, setProfileURL] = useState();

  const [getPic] = useLazyQuery(getProfilePic, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setProfileURL(data?.organizations?.[0]?.logo);
    },
    onError: (e) => {
      console.log("Error",e);
    }
  })

  const [getEmployee] = useLazyQuery(getAllEmployees, {
    fetchPolicy:"network-only",
    onCompleted: (data) => {
      setEmployee(data?.employees)
      const tempstate = {...globalState};
      tempstate.employeeAddRefresh =  false;
      handleGlobalState(tempstate);
    },
    onError: (e) => {
      console.log("Error",e);
    }
  })

  useEffect(() => {
    getPic({
      variables : {
        org_id: localStorage.getItem("organization_id")
      }
    })
  }, [globalState.employeeAddRefresh]);

  return (
    <div className="flex bg-white">
      <div className="hidden sm:block w-2/12 bg-white h-screen">
        <LeftMenuBar />
      </div>
      <div className="w-full bg-background">
        <div className="p-0">
          <TopNavigationBar title={"Employees"} />
        </div>
        <div className="p-6 mt-4 flex items-center gap-16">
          <h2 className="heading3">Your Employees</h2>
          <Link to={"add"}>
            <button className="btn bg-primary border-none ">
              Add Employees
            </button>
          </Link>
        </div>

        {employee === null ? <div>
        <img
          src={Illustration}
          width={350}
          height={300}
          className="block m-auto mt-20"
          alt="img"
        ></img>
        <h2 className="heading2b text-center mt-12">
          Currently no active employee
        </h2>
        </div> : 
        <div className="overflow-x-auto flex" style={{
          alignItems: Center,
          marginLeft: "20%",
        }}>
          <table className="table bg-white w-32 flex">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Education</th>
                <th>Skills</th>
                <th>Experience</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
            { employee?.map((a) => (
              <tr>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={"/docs/" + profileURL} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{a.name}</div>
                      {/* <div className="text-sm opacity-50">{ a.email }</div> */}
                    </div>
                  </div>
                </td>
                <td>{a.email}</td>
                <td>
                  {a?.role}
                  {/* <br/>
                  <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                </td>
                <td>{a?.education}</td>
                <td>{a?.skill}</td>
                <td>{a?.experience}</td>
                <td>{a?.performance}</td>
                {/* <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th> */}
              </tr>))
              }
            </tbody>
          </table>
        </div>
      }
      </div>
    </div>
  );
}

export default MainPageOfEmployees;
