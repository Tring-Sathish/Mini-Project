import "./App.css";
import { Routes, Route } from "react-router-dom";

import ForgetPassword from "./Pages/Auth/ForgetPassword";
import Registration from "./Pages/Auth/Registration";
import Login from "./Pages/Auth/Login";
import HomePage from "./Pages/Dashboard/HomePage";
import VerifyOPT from "./Pages/Auth/VerifyOPT";
import EnterNewPassword from "./Pages/Auth/EnterNewPassword";
import ProfileCreation from "./Pages/Dashboard/ProfileCreation/ProfileCreation";
import ProfileOffice from "./Pages/Dashboard/ProfileCreation/Profile-Office";
import ProfileSocial from "./Pages/Dashboard/ProfileCreation/ProfileSocial";
import ProfileTeamMembers from "./Pages/Dashboard/ProfileCreation/ProfileTeam_Members";
import ProfileSucess from "./Pages/Dashboard/ProfileCreation/Profile-Sucess";
import CreateJob from "./Pages/CreateJob/CreateJob";
import PostJob from "./Pages/CreateJob/PostJob";
import JobDetails from "./Pages/CreateJob/JobDetails";
// import PostedJobs from "./Pages/EndUser/postedJobs";
import Jobss from "./Pages/EndUser/Jobss";
import JobOrg from "./Pages/EndUser/job_org";
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
import { createContext, useState } from "react";
import MainPageOfEmployees from "./Pages/Employees/MainPageOfEmployees";
import AddNewEmployee from "./Pages/Employees/AddNewEmployee";
import MainPageOfSetting from "./Pages/Settings/MainPageOfSetting";
import SettingEditProfile from "./Pages/Settings/Setting_EditProfile";
import ProtectedRoute from "./Components/Common/ProtectedRoute";
import NotPageFound404 from "./Pages/Dashboard/NotPageFound404";

export const initialState = {
  employeeAddRefresh: false,
  orgId: ""
};

export const globalContext = createContext({
  globalState: initialState,
  handleGlobalState: (obj) => {
    return obj;
  },
});

function App() {

  const [globalState, setGlobalState] = useState(initialState); // Define globalState using useState
  const handleGlobalState = (obj) => {
    setGlobalState(obj);
  };
  return (
    <globalContext.Provider value={{ globalState, handleGlobalState }}>
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
            element={<ProfileOffice />}
          />
          <Route path="profilesetup/social" element={<ProfileSocial />} />
          <Route
            path="profilesetup/addteam"
            element={<ProfileTeamMembers />}
          />
          <Route path="profilesetup/sucess" element={<ProfileSucess />} />
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
            element={<SettingEditProfile />}
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
        <Route path="/portal/org" element={<JobOrg />} />
        <Route path="/portal/job/:id" element={<Jobss />} />
        <Route
          path="portal/job/description/:id"
          element={<PostedJobDescription />}
        />
        <Route path="portal/job/apply/:id" element={<PostedJobApplyForm />} />
      </Routes>{" "}
    </div>
    </globalContext.Provider>
  );
}

export default App;