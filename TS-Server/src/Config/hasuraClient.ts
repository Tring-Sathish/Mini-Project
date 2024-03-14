import axios from 'axios';
import { Console } from 'console';
import dotenv from "dotenv";
dotenv.config();

export const QueryHasura = async (query: any, variables: any = {}, header: any = null) => {
  const headers = header || { 'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET_KEY };
  const input = {
    method: 'post',
    url: process.env.HASURA_BACKEND_URL,
    headers,
    data: {
      query,
      variables,
    },
  };
  console.log(JSON.stringify(input), QueryHasura.name);  
  const resp = await axios(input);
  if (resp.data.errors) {
    console.error(`Error at QueryHasura *** ${resp.data.errors[0].message}`, resp.data.errors[0], QueryHasura.name);
    throw new Error(resp.data.errors[0].message);
  }
  return resp.data.data;
};
