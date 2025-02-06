import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_JOB = gql`
  mutation AddJob($company: String!, $position: String!, $status: String!) {
    addJob(company: $company, position: $position, status: $status) {
      _id
      company
      position
      status
    }
  }
`;

