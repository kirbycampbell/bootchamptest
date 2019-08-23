import React from "react";
import "./App.css";
import LoggedInUser from "./LoggedInUser";
import NewUser from "./NewUser";

function App() {
  return (
    <div className="App">
      <LoggedInUser name={"Kirby Campbell"} />
      <NewUser />
    </div>
  );
}

export default App;
