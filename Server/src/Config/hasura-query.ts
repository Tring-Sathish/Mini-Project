  export const GET_USER_BY_EMAIL = `query GET_USER_BY_EMAIL($email: String) {
    users(where: {email: {_eq: $email}}) {
      id
      isVerified
      org_id
      org_registered
      email
      f_name
      password
    }
  }
  `;

  export const INSERT_USER = `mutation insertUser($data: users_insert_input!) {
    insert_users_one(object: $data) {
      email
      id
      username
    }
  }
  `;

  export const UPDATE_USER = `mutation UPDATE_USER($id: uuid, $data: users_set_input!) {
    update_users(where: {id: {_eq: $id}}, _set: $data) {
      affected_rows
    }
  }
  `;