import React, { useState } from "react";
import "./App.css";
import LoggedInUser from "./LoggedInUser";
import NewUser from "./SignInUp/NewUser";
import TopNav from "./TopNav/TopNav";

function App() {
  const [createAccount, setCreateAccount] = useState(false);
  return (
    <div className="App">
      {/* <LoggedInUser /> */}
      <TopNav />

      <NewUser
        createAccount={createAccount}
        setCreateAccount={setCreateAccount}
      />
    </div>
  );
}

export default App;
