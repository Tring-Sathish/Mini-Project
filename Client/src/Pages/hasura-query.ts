import { gql } from "@apollo/client";

export const signIn = gql`
mutation signIn($email: String!, $password: String!) {
  signIn(arg1: {email: $email, password: $password }) {
    message
    token
    id
  }
}`;

export const signUp = gql`
mutation signUp($username: String!, $password: String!, $email: String!, $confirm_password: String!, $f_name: String!) {
  Register(arg1: {confirm_password: $confirm_password, email: $email, f_name: $f_name, password: $password, username: $username}) {
    message
  }
}`;

export const getProfilePic = gql`
query getProfilePic($org_id: uuid!) {
  organizations(where: {id: {_eq: $org_id}}) {
    logo
  }
}
`;

export const insertOrganization = gql`
mutation insertOrganization($data: [organizations_insert_input!]!) {
  insert_organizations(objects: $data) {
    affected_rows
    returning {
      id
    }
  }
}
`;

export const getUserById = gql`
query getUserById($id: uuid!) {
  users(where: {id: {_eq : $id}}) {
    username
    org_registered
    org_id
    isVerified
    id
    f_name
    email
    password
    passwordResetToken
  }
}
`;

export const updataUserById = gql`
mutation updateUser($id: uuid!, $data: users_set_input) {
  update_users(where: {id: {_eq: $id}}, _set: $data) {
    affected_rows
  }
}
`;

export const getOrganizationById = gql`
query getOrganizationById($id: uuid!) {
  organizations(where: {id: {_eq: $id}}) {
    username
    id
    logo
    organization_name
    phoneNo
    region
    office_country
    office_city
    office_address
    linkedIn_url
    insta_url
    fb_url
    departments
    website
    yt_url
  }
}
`;

export const getAllEmployees = gql`
query getAllEmployees($orgId: uuid!) {
  employees(where: {org_id: {_eq: $orgId}}) {
    email
    id
    name
    org_id
    experience
    performance
    role
    skill
    education
  }
}
`;

export const insertEmployee = gql`
mutation insertEmployee($data: [employees_insert_input!]!) {
  insert_employees(objects: $data) {
    returning {
      email
      id
      name
      org_id
    }
    affected_rows
  }
}
`;

export const getAllJobsById = gql`
query getAllJobsById($orgId: uuid!, $filter: [jobs_bool_exp!]) {
  jobs(where: {org_id: {_eq: $orgId}, _and: $filter}) {
    id
    applicants_no
    city
    country
    department
    jobPosition
    jobType
    job_description
    job_status
    numberOfSeats
    officeLocation
    org_id
    org_name
    report_city
    report_educational_level
    report_experience
    report_male_vs_female
    report_status
    report_university
    salaryRangeFrom
    salaryRangeUpto
    jobToOrg {
      departments
      fb_url
      id
      insta_url
      linkedIn_url
      logo
      office_address
      office_city
      office_country
      organization_name
      phoneNo
      region
      username
      website
      yt_url
    }
  }
}
`;

export const insertJobs = gql`
mutation insertJobs($data: [jobs_insert_input!]!) {
  insert_jobs(objects: $data) {
    returning {
      id
      org_id
      applicants_no
      city
      country
      department
      jobPosition
      jobType
      job_description
      job_status
      numberOfSeats
      officeLocation
      org_name
      report_city
      report_educational_level
      report_experience
      report_male_vs_female
      report_status
      report_university
      salaryRangeFrom
      salaryRangeUpto
    }
    affected_rows
  }
}
`;

export const getAllOrgs = gql`
query getAllOrgs {
  organizations {
    id
    departments
    fb_url
    insta_url
    linkedIn_url
    logo
    office_address
    office_city
    office_country
    organization_name
    phoneNo
    region
    username
    website
    yt_url
  }
}
`;

export const insertCandidates = gql`
mutation insertCandidates($objects: [candidates_insert_input!]!) {
  insert_candidates(objects: $objects) {
    affected_rows
  }
}
`;

export const forgotPassword = gql`
mutation forgotPassword($email: String!) {
  forgotPassword(arg1: {email: $email}) {
    message
  }
}
`;

export const verifyUser = gql`
mutation verifyUser($email: String!, $otp: String!, $_set: users_set_input = {}) {
  update_users(where: {email: {_eq: $email}, passwordResetToken: {_eq: $otp}}, _set: $_set) {
    affected_rows
    returning {
      id
    }
  }
}
`;

export const updatePass = gql`
mutation updatePass($id: String!, $password: String!) {
  updatePass(arg1: {password: $password, id: $id}) {
    message
  }
}
`;