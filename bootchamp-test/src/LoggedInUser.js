import React from "react";
import Contributor from "./Contributor";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const LoggedInUser = () => (
  <Query
    query={gql`
      {
        contributors(where: { name: "Kirby Campbell" }) {
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
    `}
  >
    {({ loading, error, data }) => {
      if (data.contributors !== undefined) {
        console.log(data.contributors[0]);
      }
      if (loading) return <p>Good things take time....</p>;
      if (error) return <p>Something went wrong...</p>;

      return (
        <div className="row">
          {data.contributors.map(contributor => (
            <Contributor key={contributor.id} contributor={contributor} />
          ))}
        </div>
      );
    }}
  </Query>
);

export default LoggedInUser;
