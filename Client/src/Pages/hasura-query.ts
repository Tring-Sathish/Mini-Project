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
mutation signUp($username: String!, $password: String!, $email: String!, $company_name: String!, $confirm_password: String!, $f_name: String!) {
  Register(arg1: {company_name: $company_name, confirm_password: $confirm_password, email: $email, f_name: $f_name, password: $password, username: $username}) {
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
    company_name
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
query getAllJobsById($orgId: uuid!) {
  jobs(where: {org_id: {_eq: $orgId}}) {
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