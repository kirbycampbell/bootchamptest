import gql from "graphql-tag";

export const GET_CONTRIBUTOR = gql`
  query GET_CONTRIBUTOR($name: String!) {
    contributors(where: { name: $name }) {
      id
      name
      online
      createdAt
      updatedAt
      email
      avatar {
        id
        fileName
        url(transformation: { image: { resize: { width: 100, height: 100 } } })
      }
      postItems {
        id
        title
      }
      upvoted {
        id
      }
    }
  }
`;

export const SIGN_IN_CONTRIBUTOR = gql`
  query SIGN_IN_CONTRIBUTOR($email: String!, $password: String!) {
    contributors(where: { email: $email, password: $password }) {
      id
      name
      online
      createdAt
      updatedAt
      email
      password
      avatar {
        id
        fileName
        url(transformation: { image: { resize: { width: 100, height: 100 } } })
      }
      postItems {
        id
        title
      }
      upvoted {
        id
      }
    }
  }
`;
