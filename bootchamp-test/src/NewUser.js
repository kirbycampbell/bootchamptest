import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { NEW_CONTRIBUTOR_CREATE } from "./API/Mutations";

const NewUser = () => {
  const [createNewUser, { data }] = useMutation(NEW_CONTRIBUTOR_CREATE);
  console.log(data);
  const combineUserCall = () => {
    console.log("submit");
    createNewUser({
      variables: {
        data: {
          name: "Firby Fambpell",
          password: "123456789asdf",
          online: true,
          status: "PUBLISHED"
        }
      }
    });
  };
  return (
    <div>
      <button type="button" onClick={() => combineUserCall()}>
        Create Account
      </button>
    </div>
  );
};

export default NewUser;
