import React, { useContext, useRef, useState } from "react";
import JsonTree from "./JsonTree";
import { AppContext } from "./Theme";
import { FaSun, FaMoon } from "react-icons/fa";

function Input() {
  const DefaultInputjson = {
    user: {
      name: "Ravi",
      age: 21,
      city: "Bangalore",
    },
  };
  const { Dfvalue, setDfvalue, JsonSearchContext, setsearchJson } =
    useContext(AppContext);

  const JsonInput = useRef("");
  const [parseinput, setparseinpt] = useState(DefaultInputjson);

  // make the tree function
  const Visualize = (e) => {
    e.preventDefault();
    try {
      const ParseInputJson = JSON.parse(JsonInput.current.value);
      setparseinpt(ParseInputJson);
    } catch (err) {
      console.log(err.message);
      alert("invalid JSON format! Please check your input.");
    }
  };

  const [first, setfirst] = useState(true);
  // const [theme, setTheme] = useState("Ligth");
  const [JsonSearch, SetJsonsearch] = useState("User.name");

  const handelToggle = () => {
    setfirst((prev) => !prev);
    if (first) {
      setDfvalue("Ligth");
    } else {
      setDfvalue("dark");
    }
  };

  // handel the serach key
  const SearchJosn = () => {
    if (!JsonSearch) {
      alert("Search input is required");
    }
    alert(JsonSearch)
    setsearchJson(JsonSearch);
  };

  const GetSearchkey = (e) => {
    SetJsonsearch(e.target.value);
  };

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row items-start justify-center gap-8 p-6 md:p-10 transition-all duration-500 ${
        Dfvalue === "dark"
          ? "bg-gradient-to-br from-gray-900 to-black text-white"
          : "bg-gradient-to-br from-indigo-50 to-white text-gray-900"
      }`}
    >
      <div className="absolute top-6 right-6">
        <button
          onClick={handelToggle}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300"
        >
          {Dfvalue === "light" ? <FaSun /> : <FaMoon />}
          <span className="font-medium capitalize">{Dfvalue}</span>
        </button>
      </div>

      <div
        className={`w-full md:w-1/2 rounded-2xl p-6 shadow-xl border transition-all duration-300 ${
          Dfvalue === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <h1
          className={`text-3xl font-semibold mb-4 text-center ${
            Dfvalue === "dark" ? "text-indigo-300" : "text-indigo-700"
          }`}
        >
          JSON Visualizer
        </h1>
        <textarea
          name="JsonDataInput"
          id="userInput"
          autoFocus
          placeholder={JSON.stringify(DefaultInputjson, null, 2)}
          ref={JsonInput}
          required
          className={`w-full h-64 p-4 rounded-xl font-mono text-sm resize-none outline-none border transition-all duration-300 ${
            Dfvalue === "dark"
              ? "bg-gray-900 text-gray-100 border-gray-700 focus:ring-2 focus:ring-indigo-400"
              : "bg-white text-gray-800 border-gray-300 focus:ring-2 focus:ring-indigo-400"
          }`}
        ></textarea>

        <button
          onClick={Visualize}
          className="mt-5 w-full py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all duration-300 shadow-md"
        >
          Visualize
        </button>
      </div>

      <div
        className={`w-full md:w-1/2 rounded-2xl p-6 flex flex-col items-center justify-center space-y-4 transition-all duration-300 shadow-xl border ${
          Dfvalue === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="w-full flex items-center gap-2">
          <input
            type="text"
            placeholder=" Search JSON keys..."
            value={JsonSearch}
            onChange={(e) => GetSearchkey(e)}
            className={`w-full px-4 py-2 rounded-xl outline-none transition-all duration-200 border ${
              Dfvalue === "dark"
                ? "bg-gray-900 text-white border-gray-700 focus:ring-2 focus:ring-blue-400"
                : "bg-white text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-300"
            }`}
          />
          {JsonSearch && (
            <>
              <button
                onClick={() => SetJsonsearch("")}
                className="bg-red-500 text-white px-3 py-2 rounded-xl hover:bg-red-600 transition duration-200"
              >
                Clear
              </button>
              <button
                onClick={SearchJosn}
                className="bg-blue-500 text-white px-3 py-2 rounded-xl hover:bg-blue-600 transition duration-200"
              >
                Search
              </button>
            </>
          )}
        </div>

        <div
          className={`w-full mt-4 rounded-xl p-4 overflow-y-auto max-h-[400px] border transition-all duration-300 ${
            Dfvalue === "dark"
              ? "bg-gray-900 border-gray-700"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          {parseinput && JsonSearch ? (
            <JsonTree data={parseinput} JsonSearch={JsonSearch}/>
          ) : (
            <p className="text-center italic opacity-70">
              Enter JSON on the left and click{" "}
              <span className="font-semibold text-indigo-500">“Visualize”</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Input;
