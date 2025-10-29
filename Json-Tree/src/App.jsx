import React, { useState } from "react";
import Input from "./Components/Input";
import { AppContext } from "./Components/Theme";
import JsonTree from "./Components/JsonTree";

function App() {
  const [ Dfvalue, setDfvalue ] = useState("dark");
  const [ JsonSearchContext, setsearchJson ] = useState("user.name");
  return (
    <div>
      <AppContext.Provider value={{ Dfvalue, setDfvalue, JsonSearchContext, setsearchJson  }}>
        <Input />
        <JsonTree></JsonTree>
      </AppContext.Provider>
    </div>
  );
}

export default App;
