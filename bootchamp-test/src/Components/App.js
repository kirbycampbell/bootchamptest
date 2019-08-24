import React, { useState } from "react";
import "./App.css";
import LoggedInUser from "./LoggedInUser";
import NewUser from "./SignInUp/NewUser";

function App() {
  const [createAccount, setCreateAccount] = useState(false);
  return (
    <div className="App">
      {/* <LoggedInUser /> */}

      <NewUser
        createAccount={createAccount}
        setCreateAccount={setCreateAccount}
      />
    </div>
  );
}

export default App;
