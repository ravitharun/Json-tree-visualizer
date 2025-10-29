import React, { useState } from "react";
import Input from "./Components/Input";
import { AppContext } from "./Components/Theme";
import JsonTree from "./Components/JsonTree";

function App() {
  const [ Dfvalue, setDfvalue ] = useState("Ligth");
  const [ JsonSearch, setsearchJson ] = useState("");
  return (
    <div>
      <AppContext.Provider value={{ Dfvalue, setDfvalue, JsonSearch, setsearchJson  }}>
        <Input />
        <JsonTree></JsonTree>
      </AppContext.Provider>
    </div>
  );
}

export default App;
