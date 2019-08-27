import gql from "graphql-tag";

export const NEW_CONTRIBUTOR_CREATE = gql`
  mutation CreateContributor($data: ContributorCreateInput!) {
    createContributor(data: $data) {
      id
      name
      status
      online
      password
    }
  }
`;
