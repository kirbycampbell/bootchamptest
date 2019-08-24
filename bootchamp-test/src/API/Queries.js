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
