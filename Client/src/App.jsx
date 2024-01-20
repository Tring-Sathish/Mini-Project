import "./App.css";
import { Routes, Route } from "react-router-dom";

import ForgetPassword from "./Pages/Auth/ForgetPassword";
import Registration from "./Pages/Auth/Registration";
import Login from "./Pages/Auth/Login";
import HomePage from "./Pages/Dashboard/HomePage";
import VerifyOPT from "./Pages/Auth/VerifyOPT";
import EnterNewPassword from "./Pages/Auth/EnterNewPassword";
import ProfileCreation from "./Pages/Dashboard/ProfileCreation/ProfileCreation";
import Profile_Office from "./Pages/Dashboard/ProfileCreation/Profile-Office";
import ProfileSocial from "./Pages/Dashboard/ProfileCreation/ProfileSocial";
import ProfileTeam_Members from "./Pages/Dashboard/ProfileCreation/ProfileTeam_Members";
import Profile_Sucess from "./Pages/Dashboard/ProfileCreation/Profile-Sucess";
import CreateJob from "./Pages/CreateJob/CreateJob";
import PostJob from "./Pages/CreateJob/PostJob";
import JobDetails from "./Pages/CreateJob/JobDetails";
// import PostedJobs from "./Pages/EndUser/postedJobs";
import Jobss from "./Pages/EndUser/Jobss";
import PostedJobDescription from "./Pages/EndUser/PostedJobDescription";
import PostedJobApplyForm from "./Pages/EndUser/PostedJobApplyForm";

import AppliedCandidateDetails from "./Pages/RecruitmentCycle/AppliedCandidateDetails";
import InterviewingCandidate from "./Pages/RecruitmentCycle/InterviewingCandidate";
import InterviewingCandidateDetails from "./Pages/RecruitmentCycle/InterviewingCandidateDetails";
import ReccomendedCandidates from "./Pages/RecruitmentCycle/ReccomendedCandidates";
import ReccomendedCandidatesDetails from "./Pages/RecruitmentCycle/ReccomendedCandidatesDetails";
import HiredCandidates from "./Pages/RecruitmentCycle/HiredCandidates";
import RejectedCandidates from "./Pages/RecruitmentCycle/RejectedCandidates";
import WithdrawnCandidate from "./Pages/RecruitmentCycle/WithdrawnCandidate";
import WithdrawnDetails from "./Pages/RecruitmentCycle/WithdrawnDetails";
import HiredCandidate from "./Pages/HiredCandidates/HiredCandidate";
import HiredCandidateDetails from "./Pages/HiredCandidates/HiredCandidatesDetails";
import MainPage from "./Pages/Report/MainPage";
import { useEffect, useState } from "react";
import MainPageOfEmployees from "./Pages/Employees/MainPageOfEmployees";
import AddNewEmployee from "./Pages/Employees/AddNewEmployee";
import MainPageOfSetting from "./Pages/Settings/MainPageOfSetting";
import Setting_EditProfile from "./Pages/Settings/Setting_EditProfile";
import ProtectedRoute from "./Components/Common/ProtectedRoute";
import NotPageFound404 from "./Pages/Dashboard/NotPageFound404";

function App() {

  const org_id = localStorage.getItem("organization_id")
  console.log(org_id)
  // const [org_registered,setOrg_registered] = useState(false);
  return (
    <div>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<CreateJob />}></Route>
          <Route path="/postjob" element={<PostJob />}></Route>
          <Route path="/JobDetails/:id" element={<JobDetails />}></Route>
          <Route path="/profilesetup" element={<ProfileCreation />} />
          <Route
            path="profilesetup/organization"
            element={<Profile_Office />}
          />
          <Route path="profilesetup/social" element={<ProfileSocial />} />
          <Route
            path="profilesetup/addteam"
            element={<ProfileTeam_Members />}
          />
          <Route path="profilesetup/sucess" element={<Profile_Sucess />} />
          <Route
            path="/JobDetails/applied/:id"
            element={<AppliedCandidateDetails />}
          />
          <Route
            path="/JobDetails/interviewing/:id"
            element={<InterviewingCandidate />}
          />
          <Route
            path="/JobDetails/interviewing/details/:id"
            element={<InterviewingCandidateDetails />}
          />
          <Route
            path="/JobDetails/reccomended/:id"
            element={<ReccomendedCandidates />}
          />
          <Route
            path="/JobDetails/reccomended/details/:id"
            element={<ReccomendedCandidatesDetails />}
          />
          <Route path="/JobDetails/hired/:id" element={<HiredCandidates />} />
          <Route
            path="/JobDetails/rejected/:id"
            element={<RejectedCandidates />}
          />
          <Route
            path="/JobDetails/withdrawn/:id"
            element={<WithdrawnCandidate />}
          />
          <Route
            path="/JobDetails/withdrawn/details/:id"
            element={<WithdrawnDetails />}
          />
          {/* ***************************************************** */}
          {/* CANDIDATE SECTION IS STARTING FROM HERE */}
          {/* ***************************************************** */}
          <Route path="/Candidates" element={<HiredCandidate />} />
          <Route
            path="/Candidates/details/:id"
            element={<HiredCandidateDetails />}
          />
          <Route path="/report" element={<MainPage />} />
          <Route path="/employees" element={<MainPageOfEmployees />}></Route>
          <Route path="/employees/add" element={<AddNewEmployee />}></Route>
          <Route path="/settings" element={<MainPageOfSetting />}></Route>
          <Route
            path="/settings/profile"
            element={<Setting_EditProfile />}
          ></Route>
        </Route>
        {/* **************************** */}
        {/* FOR END - USER */}
        {/* **************************** */}
        <Route path="/*" element={<NotPageFound404 />} />{" "}
        <Route path="/verifyotp" element={<VerifyOPT />} />
        <Route path="/newpassword" element={<EnterNewPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpwd" element={<ForgetPassword />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/portal/job" element={<Jobss />} />
        <Route
          path="portal/job/description/:id"
          element={<PostedJobDescription />}
        />
        <Route path="portal/job/apply/:id" element={<PostedJobApplyForm />} />
      </Routes>{" "}
    </div>
  );
}

export default App;