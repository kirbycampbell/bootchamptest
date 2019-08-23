import gql from "graphql-tag";

export const GET_CONTRIBUTOR = gql`
  query GET_CONTRIBUTOR($name: String!) {
    contributors(where: { name: $name }) {
      id
      name
      online
      joinedDate
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
