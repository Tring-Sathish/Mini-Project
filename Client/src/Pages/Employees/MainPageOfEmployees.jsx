import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
import Illustration from "../../assets/illustrations/no_user.svg";


function MainPageOfEmployees() {

  const [employee,setEmployee] = useState();
  useEffect(() => {
    // axios POST request
    const options = {
      url: "http://localhost:8080/getEmployee",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        organization_id: localStorage.getItem("organization_id"),
      },
    };
  
    axios(options).then((response) => {
      if (response.status == 200) {
        setEmployee(response.data.employee);
      }
      // console.log(response);
    });
  }, []);

  const [profileURL, setProfileURL] = useState();

  useEffect(() => {
    // axios POST request
    const options = {
      url: "http://localhost:8080/getProfilePic",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        organization_id: localStorage.getItem("organization_id"),
      },
    };

    axios(options).then((response) => {
      if (response.status == 200) {
        setProfileURL(response.data.split("\\")[1]);
      }
    });
  }, [0]);

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

        {employee == null ? <div>
        <img
          src={Illustration}
          width={350}
          height={300}
          className="block m-auto mt-20"
        ></img>
        <h2 className="heading2b text-center mt-12">
          Currently no active employee
        </h2>
        </div> : 
      //   <div className="flex gap-8 mt-12 flex-wrap justify-center items-center mb-12">
      //   {employee.map((e) => (
      //   <div htmlFor="my_modal_6" className="btn" style={{"margin": "15px"}}>
      //     <div className="card w-56 bg-base-100 shadow-xl image-full">
      //       <figure><img src={"http://127.0.0.1:8081/uploads/" + "" + profileURL} alt="Shoes" /></figure>
      //       <div className="card-body">
      //         <h2 className="card-title">{e.name}</h2>
      //         <h2 className="card-title">{e.email}</h2>
      //         {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
      //         {/* <div className="card-actions justify-end">
      //           <button className="btn btn-primary">Buy Now</button>
      //         </div> */}
      //       </div>
      //     </div>      
      //   </div>))} 
      // </div>
      <div >
        <div className="overflow-x-auto  shadow-2xl flex">
          <table className="table bg-white w-32">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
            { employee.map((a) => (
              <tr>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={"http://127.0.0.1:8081/uploads/" + "" + profileURL} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{a.name}</div>
                      <div className="text-sm opacity-50">{ a.email }</div>
                    </div>
                  </div>
                </td>
                <td>
                  Zemlak, Daniel and Leannon
                  <br/>
                  <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                </td>
                <td>Purple</td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>))
              }
            </tbody>
          </table>
        </div>
      </div>
      }
      </div>
    </div>
  );
}

export default MainPageOfEmployees;
